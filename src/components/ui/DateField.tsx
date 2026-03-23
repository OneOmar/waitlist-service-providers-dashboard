import { forwardRef, useId } from 'react'
import { Calendar } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

export type DateFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  helperText?: string
}

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  function DateField(
    { id, label, helperText = 'MM/DD/YYYY', className, disabled, type, ...props },
    ref,
  ) {
    const autoId = useId()
    const inputId = id ?? props.name ?? autoId
    const showTrailingIcon = type !== 'date'

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        <label
          htmlFor={inputId}
          className="text-label font-semibold leading-label text-text-primary"
        >
          {label}
        </label>
        <div
          className={cn(
            'flex items-center rounded-input border border-border-focus bg-surface-elevated px-3 py-2',
            disabled && 'cursor-not-allowed opacity-60',
          )}
        >
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            className="min-w-0 flex-1 bg-transparent text-body leading-body text-text-primary outline-none placeholder:text-text-muted"
            {...props}
          />
          {showTrailingIcon ? (
            <Calendar
              aria-hidden
              className="ml-2 size-4 shrink-0 text-text-muted"
              strokeWidth={1.75}
            />
          ) : null}
        </div>
        {helperText ? (
          <p className="text-caption leading-caption text-text-muted">{helperText}</p>
        ) : null}
      </div>
    )
  },
)
