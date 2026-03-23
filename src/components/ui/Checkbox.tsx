import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className'
> & {
  label: string
  className?: string
  labelClassName?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { id, label, className, labelClassName, disabled, ...props },
    ref,
  ) {
    const autoId = useId()
    const inputId = id ?? props.name ?? autoId

    return (
      <label
        className={cn(
          'inline-flex cursor-pointer items-start gap-2.5',
          disabled && 'cursor-not-allowed opacity-60',
          className,
        )}
      >
        <span className="relative mt-0.5 inline-flex size-4 shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            className={cn(
              'peer size-4 appearance-none rounded-sm border border-border-strong bg-surface-elevated',
              'transition-colors checked:border-brand-primary checked:bg-brand-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed',
            )}
            {...props}
          />
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            className="pointer-events-none absolute inset-0 m-auto size-3 text-text-on-brand opacity-0 peer-checked:opacity-100"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className={cn(
            'text-body leading-body text-text-primary select-none',
            labelClassName,
          )}
        >
          {label}
        </span>
      </label>
    )
  },
)
