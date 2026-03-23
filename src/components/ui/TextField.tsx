import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/cn'

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  inputClassName?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      id,
      label,
      hint,
      error,
      className,
      inputClassName,
      startAdornment,
      endAdornment,
      disabled,
      ...props
    },
    ref,
  ) {
    const autoId = useId()
    const inputId = id ?? props.name ?? autoId

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label ? (
          <label
            htmlFor={inputId}
            className="text-label font-semibold leading-label text-text-primary"
          >
            {label}
          </label>
        ) : null}
        <div
          className={cn(
            'flex items-center rounded-input border border-border-default bg-surface-elevated px-3 py-2',
            'focus-within:ring-2 focus-within:ring-border-focus',
            error && 'border-danger ring-1 ring-danger',
            disabled && 'cursor-not-allowed opacity-60',
          )}
        >
          {startAdornment ? (
            <span className="mr-2 flex shrink-0 text-text-muted [&_svg]:size-4">
              {startAdornment}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'min-w-0 flex-1 bg-transparent text-body leading-body text-text-primary outline-none placeholder:text-text-muted',
              inputClassName,
            )}
            {...props}
          />
          {endAdornment ? (
            <span className="ml-2 flex shrink-0 text-text-muted [&_svg]:size-4">
              {endAdornment}
            </span>
          ) : null}
        </div>
        {error ? (
          <p className="text-caption leading-caption text-danger" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p className="text-caption leading-caption text-text-muted">{hint}</p>
        ) : null}
      </div>
    )
  },
)
