import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ label, className, children, type = 'button', ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        className={cn(
          'inline-flex size-9 items-center justify-center rounded-full text-text-secondary transition-colors',
          'hover:bg-surface-muted hover:text-text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          '[&_svg]:size-4',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)
