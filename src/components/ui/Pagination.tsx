import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/utils/cn'

import { Button } from './Button'

export type PaginationProps = {
  page: number
  pageCount: number
  onPageChange?: (page: number) => void
  className?: string
  labels?: { previous: string; next: string }
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
  labels = { previous: 'Previous', next: 'Next' },
}: PaginationProps) {
  if (pageCount < 1) {
    return null
  }

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        'inline-flex max-w-full flex-wrap items-center gap-1',
        className,
      )}
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        radius="default"
        className="gap-1 px-2"
        disabled={page <= 1}
        onClick={() => onPageChange?.(Math.max(1, page - 1))}
        aria-label={labels.previous}
      >
        <ChevronLeft className="size-4" strokeWidth={1.75} />
        <span className="hidden sm:inline">{labels.previous}</span>
      </Button>
      {pages.map((n) => (
        <Button
          key={n}
          type="button"
          variant="ghost"
          size="sm"
          radius="default"
          className={cn(
            'min-w-9 px-2',
            n === page &&
              'border border-brand-primary text-brand-primary hover:bg-surface-elevated',
          )}
          onClick={() => onPageChange?.(n)}
          aria-current={n === page ? 'page' : undefined}
        >
          {n}
        </Button>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        radius="default"
        className="gap-1 px-2"
        disabled={page >= pageCount}
        onClick={() => onPageChange?.(Math.min(pageCount, page + 1))}
        aria-label={labels.next}
      >
        <span className="hidden sm:inline">{labels.next}</span>
        <ChevronRight className="size-4" strokeWidth={1.75} />
      </Button>
    </nav>
  )
}
