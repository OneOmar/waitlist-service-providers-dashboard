import { useMemo, useState } from 'react'

import { Button, Pagination, SearchField } from '@/components/ui'
import {
  EmptyWaitlistState,
  UserDetailsModal,
  WaitlistTable,
} from '@/components/waitlist'
import { useWaitlistFilters } from '@/context/WaitlistFiltersContext'
import { WAITLIST_PAGE_SIZE, waitlistMockRows } from '@/data/waitlist-mock'
import { isDefaultWaitlistFilters } from '@/types/waitlist-filters'
import type { WaitlistRecordType, WaitlistRow } from '@/types/waitlist'
import { filterWaitlistRows } from '@/utils/filterWaitlistRows'

export function WaitlistPage() {
  const { appliedFilters } = useWaitlistFilters()
  const [recordType, setRecordType] = useState<WaitlistRecordType>('serviceProviders')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [detailRow, setDetailRow] = useState<WaitlistRow | null>(null)
  const [rows, setRows] = useState<WaitlistRow[]>(() =>
    waitlistMockRows.map((r) => ({ ...r })),
  )

  const filteredRows = useMemo(
    () => filterWaitlistRows(rows, appliedFilters, search),
    [rows, appliedFilters, search],
  )

  const updateRowStatus = (row: WaitlistRow, status: WaitlistRow['status']) => {
    setRows((prev) =>
      prev.map((r) => (r.id === row.id ? { ...r, status } : r)),
    )
  }

  const pageCount =
    filteredRows.length === 0
      ? 0
      : Math.max(1, Math.ceil(filteredRows.length / WAITLIST_PAGE_SIZE))

  const safePage = pageCount === 0 ? 1 : Math.min(page, pageCount)

  const pageRows = useMemo(() => {
    if (filteredRows.length === 0) return []
    const start = (safePage - 1) * WAITLIST_PAGE_SIZE
    return filteredRows.slice(start, start + WAITLIST_PAGE_SIZE)
  }, [filteredRows, safePage])

  const sidebarFiltersActive = !isDefaultWaitlistFilters(appliedFilters)

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-6 px-4 py-6 sm:px-content-x sm:py-content-y">
        <header className="flex flex-col gap-5">
          <h1
            id="waitlist-title"
            className="text-2xl font-bold leading-tight text-text-primary sm:text-page-title sm:leading-page-title"
          >
            Waitlist
          </h1>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div
              role="group"
              aria-label="Record type"
              className="flex flex-wrap gap-2"
            >
              <Button
                type="button"
                variant={
                  recordType === 'serviceProviders' ? 'tabSelected' : 'tabUnselected'
                }
                size="md"
                radius="default"
                className="rounded-lg px-6"
                onClick={() => setRecordType('serviceProviders')}
              >
                Service Providers
              </Button>
              <Button
                type="button"
                variant={
                  recordType === 'customers' ? 'tabSelected' : 'tabUnselected'
                }
                size="md"
                radius="default"
                className="rounded-lg px-6"
                onClick={() => setRecordType('customers')}
              >
                Customers
              </Button>
            </div>
            <SearchField
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full min-w-0 sm:min-w-[min(100%,240px)] sm:max-w-sm sm:flex-1"
            />
          </div>
        </header>

        <section
          aria-labelledby="waitlist-title"
          className="flex min-h-0 flex-1 flex-col gap-4"
        >
          {pageRows.length === 0 ? (
            <EmptyWaitlistState
              query={search}
              sidebarFiltersActive={sidebarFiltersActive}
            />
          ) : (
            <>
              <WaitlistTable rows={pageRows} onEdit={setDetailRow} />
              <Pagination
                page={safePage}
                pageCount={pageCount}
                onPageChange={setPage}
              />
            </>
          )}
        </section>
      </div>

      {detailRow ? (
        <UserDetailsModal
          key={detailRow.id}
          row={detailRow}
          recordType={recordType}
          onClose={() => setDetailRow(null)}
          onOnboard={(r) => updateRowStatus(r, 'Onboarded')}
          onReject={(r) => updateRowStatus(r, 'Rejected')}
        />
      ) : null}
    </>
  )
}
