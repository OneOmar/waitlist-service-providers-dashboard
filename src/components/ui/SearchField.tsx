import { forwardRef } from 'react'
import { Search } from 'lucide-react'

import { cn } from '@/utils/cn'

import type { TextFieldProps } from './TextField'
import { TextField } from './TextField'

export type SearchFieldProps = Omit<TextFieldProps, 'type' | 'endAdornment'>

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField({ placeholder = 'Search User', className, ...props }, ref) {
    return (
      <TextField
        ref={ref}
        type="search"
        placeholder={placeholder}
        endAdornment={<Search aria-hidden className="size-4" strokeWidth={1.75} />}
        className={cn('min-w-[200px]', className)}
        inputClassName="[&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
    )
  },
)
