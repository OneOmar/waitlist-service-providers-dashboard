import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

export type ButtonVariant =
  | 'primary'
  | 'danger'
  | 'outline'
  | 'ghost'
  | 'tabSelected'
  | 'tabUnselected'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'pill'

export type ButtonRadius = 'default' | 'lg' | 'full'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  radius?: ButtonRadius
  fullWidth?: boolean
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-text-on-brand shadow-filter-button hover:bg-brand-primary-hover',
  danger:
    'bg-danger text-text-on-danger shadow-sm hover:bg-danger-hover',
  outline:
    'border border-border-default bg-surface-elevated text-text-primary hover:bg-surface-muted',
  ghost:
    'text-text-secondary hover:bg-surface-muted hover:text-text-primary',
  tabSelected:
    'border border-transparent bg-surface-muted text-text-primary',
  tabUnselected:
    'border border-border-default bg-surface-elevated text-text-primary hover:bg-surface-muted',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-caption leading-caption font-medium',
  md: 'px-4 py-2.5 text-label leading-label font-semibold',
  lg: 'px-4 py-3 text-label leading-label font-semibold',
  pill: 'px-8 py-3 text-label leading-label font-semibold',
}

const radiusClass: Record<ButtonRadius, string> = {
  default: 'rounded-xl',
  lg: 'rounded-xl',
  full: 'rounded-full',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = 'primary',
      size = 'md',
      radius = 'default',
      fullWidth,
      type = 'button',
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variantClass[variant],
          sizeClass[size],
          radiusClass[radius],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      />
    )
  },
)
