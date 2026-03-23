import type { ComponentPropsWithoutRef, TdHTMLAttributes, ThHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

export function Table({ className, ...props }: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="overflow-x-auto rounded-table border border-border-default bg-surface-elevated shadow-table">
      <table
        className={cn('w-full min-w-[720px] border-collapse text-left', className)}
        {...props}
      />
    </div>
  )
}

export function TableHeader({ className, ...props }: ComponentPropsWithoutRef<'thead'>) {
  return <thead className={cn(className)} {...props} />
}

export function TableBody({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) {
  return <tbody className={cn(className)} {...props} />
}

export function TableRow({
  className,
  striped,
  ...props
}: ComponentPropsWithoutRef<'tr'> & { striped?: boolean }) {
  return (
    <tr
      className={cn(
        striped && 'even:bg-surface-table-row-alt hover:bg-surface-muted/50',
        !striped && 'hover:bg-surface-muted/50',
        className,
      )}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'border-b border-border-default px-4 py-4 text-table-header leading-table-header font-bold text-text-primary first:pl-6 last:pr-6',
        className,
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        'border-b border-border-default px-4 py-table-cell-y text-table-cell leading-table-cell text-text-primary first:pl-6 last:pr-6',
        className,
      )}
      {...props}
    />
  )
}
