import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/utils/cn'

export type CardProps = ComponentPropsWithoutRef<'div'> & {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  elevated?: boolean
}

const paddingClass: Record<NonNullable<CardProps['padding']>, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  className,
  padding = 'md',
  elevated = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-modal border border-border-default bg-surface-elevated',
        elevated && 'shadow-modal',
        paddingClass[padding],
        className,
      )}
      {...props}
    />
  )
}
