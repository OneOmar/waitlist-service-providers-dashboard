/** Sidebar filter form — draft is edited in the panel; applied drives the table. */
export type WaitlistSidebarFilters = {
  postcode: string
  statusOnboarded: boolean
  statusRejected: boolean
  dateStart: string
  dateEnd: string
  vendorIndependent: boolean
  vendorCompany: boolean
  serviceHousekeeping: boolean
  serviceWindowCleaning: boolean
  serviceCarValet: boolean
}

export function isDefaultWaitlistFilters(f: WaitlistSidebarFilters): boolean {
  return (
    JSON.stringify(f) === JSON.stringify(createDefaultWaitlistFilters())
  )
}

export function createDefaultWaitlistFilters(): WaitlistSidebarFilters {
  return {
    postcode: '',
    statusOnboarded: false,
    statusRejected: false,
    dateStart: '',
    dateEnd: '',
    vendorIndependent: false,
    vendorCompany: false,
    serviceHousekeeping: false,
    serviceWindowCleaning: false,
    serviceCarValet: false,
  }
}
