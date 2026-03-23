import type { HTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

export type StatusTone = 'success' | 'danger' | 'muted' | 'neutral'

export type StatusTextProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: StatusTone
}

const toneClass: Record<StatusTone, string> = {
  success: 'text-text-success',
  danger: 'text-text-danger',
  muted: 'text-text-muted',
  neutral: 'text-text-primary',
}

/**
 * Row status label (e.g. Onboarded / Rejected) matching Figma text colors.
 */
export function StatusText({
  className,
  tone = 'neutral',
  ...props
}: StatusTextProps) {
  return (
    <span
      className={cn(
        'text-table-cell leading-table-cell font-normal',
        toneClass[tone],
        className,
      )}
      {...props}
    />
  )
}
