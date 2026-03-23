import type { HTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

export type BadgeVariant = 'neutral' | 'outline'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

const variantClass: Record<BadgeVariant, string> = {
  neutral:
    'bg-surface-muted text-text-primary',
  outline:
    'border border-border-default bg-surface-elevated text-text-primary',
}

export function Badge({
  className,
  variant = 'neutral',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-2.5 py-1 text-caption font-medium leading-caption',
        variantClass[variant],
        className,
      )}
      {...props}
    />
  )
}
