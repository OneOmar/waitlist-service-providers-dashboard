import type { WaitlistSidebarFilters } from '@/types/waitlist-filters'
import type { WaitlistRow } from '@/types/waitlist'

/** Parses `DD/MM/YYYY` from mock data. */
function parseUkDate(value: string): Date | null {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim())
  if (!m) return null
  const d = Number.parseInt(m[1]!, 10)
  const month = Number.parseInt(m[2]!, 10) - 1
  const y = Number.parseInt(m[3]!, 10)
  return new Date(y, month, d)
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function parseIsoDate(value: string): Date | null {
  const t = value.trim()
  if (!t) return null
  const [y, mo, d] = t.split('-').map((x) => Number.parseInt(x, 10))
  if (Number.isNaN(y) || Number.isNaN(mo) || Number.isNaN(d)) return null
  return new Date(y, mo - 1, d)
}

const SERVICE_LABELS = {
  serviceHousekeeping: 'Housekeeping',
  serviceWindowCleaning: 'Window Cleaning',
  serviceCarValet: 'Car Valet',
} as const

function selectedServices(f: WaitlistSidebarFilters): string[] {
  const out: string[] = []
  if (f.serviceHousekeeping) out.push(SERVICE_LABELS.serviceHousekeeping)
  if (f.serviceWindowCleaning) out.push(SERVICE_LABELS.serviceWindowCleaning)
  if (f.serviceCarValet) out.push(SERVICE_LABELS.serviceCarValet)
  return out
}

function matchesService(row: WaitlistRow, labels: string[]): boolean {
  const ro = row.serviceOffering.trim().toLowerCase()
  return labels.some(
    (label) =>
      ro === label.toLowerCase() || ro.includes(label.toLowerCase()),
  )
}

export function rowMatchesSidebarFilters(
  row: WaitlistRow,
  f: WaitlistSidebarFilters,
): boolean {
  const pc = f.postcode.replace(/\s+/g, '').toLowerCase()
  if (pc) {
    const rowPc = row.postcode.replace(/\s+/g, '').toLowerCase()
    if (!rowPc.includes(pc)) return false
  }

  const statusFilterOn = f.statusOnboarded || f.statusRejected
  if (statusFilterOn) {
    const ok =
      (f.statusOnboarded && row.status === 'Onboarded') ||
      (f.statusRejected && row.status === 'Rejected')
    if (!ok) return false
  }

  const rowDate = parseUkDate(row.signupDate)
  const hasDateFilter = Boolean(f.dateStart || f.dateEnd)

  if (hasDateFilter) {
    if (!rowDate) return false
    const rowDay = startOfDay(rowDate).getTime()

    if (f.dateStart) {
      const start = parseIsoDate(f.dateStart)
      if (!start) return false
      if (rowDay < startOfDay(start).getTime()) return false
    }
    if (f.dateEnd) {
      const end = parseIsoDate(f.dateEnd)
      if (!end) return false
      if (rowDay > startOfDay(end).getTime()) return false
    }
  }

  const vendorFilterOn = f.vendorIndependent || f.vendorCompany
  if (vendorFilterOn) {
    const ok =
      (f.vendorIndependent && row.vendorType === 'Independent') ||
      (f.vendorCompany && row.vendorType === 'Company')
    if (!ok) return false
  }

  const services = selectedServices(f)
  if (services.length > 0 && !matchesService(row, services)) return false

  return true
}

export function filterRowsBySearchQuery(
  rows: WaitlistRow[],
  query: string,
): WaitlistRow[] {
  const q = query.trim().toLowerCase()
  if (!q) return rows
  return rows.filter(
    (row) =>
      row.email.toLowerCase().includes(q) ||
      row.phone.toLowerCase().includes(q) ||
      row.postcode.toLowerCase().includes(q) ||
      row.serviceOffering.toLowerCase().includes(q),
  )
}

export function filterWaitlistRows(
  rows: WaitlistRow[],
  sidebar: WaitlistSidebarFilters,
  searchQuery: string,
): WaitlistRow[] {
  const bySidebar = rows.filter((r) => rowMatchesSidebarFilters(r, sidebar))
  return filterRowsBySearchQuery(bySidebar, searchQuery)
}
