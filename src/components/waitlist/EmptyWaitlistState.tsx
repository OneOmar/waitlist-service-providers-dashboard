import { Search } from 'lucide-react'

export type EmptyWaitlistStateProps = {
  /** Current search query (trimmed) for contextual copy. */
  query: string
  /** True when applied sidebar filters are not the default “show all”. */
  sidebarFiltersActive: boolean
}

export function EmptyWaitlistState({
  query,
  sidebarFiltersActive,
}: EmptyWaitlistStateProps) {
  const hasQuery = query.trim().length > 0

  const hint = (() => {
    if (hasQuery && sidebarFiltersActive) {
      return 'Try a different search term, or adjust or clear filters in the sidebar.'
    }
    if (hasQuery) {
      return 'Try a different search term or clear the search field.'
    }
    if (sidebarFiltersActive) {
      return 'Adjust or clear filters in the sidebar, then click Filter again.'
    }
    return 'Adjust filters in the sidebar or check back later.'
  })()

  return (
    <div
      className="flex flex-col items-center justify-center rounded-table border border-dashed border-border-default bg-surface-elevated px-6 py-16 text-center shadow-table"
      role="status"
      aria-live="polite"
    >
      <Search
        className="mb-4 size-10 text-text-muted"
        strokeWidth={1.25}
        aria-hidden
      />
      <p className="text-section font-semibold leading-section text-text-primary">
        No records match your filters
      </p>
      <p className="mt-2 max-w-sm text-body text-text-secondary">{hint}</p>
    </div>
  )
}
