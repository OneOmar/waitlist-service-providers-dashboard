/* eslint-disable react-refresh/only-export-components -- context + hook pair */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

import { useAdminLayout } from '@/components/layout/AdminLayoutContext'
import {
  createDefaultWaitlistFilters,
  type WaitlistSidebarFilters,
} from '@/types/waitlist-filters'

type WaitlistFiltersContextValue = {
  draftFilters: WaitlistSidebarFilters
  setDraftFilters: Dispatch<SetStateAction<WaitlistSidebarFilters>>
  appliedFilters: WaitlistSidebarFilters
  applyFilters: () => void
}

const WaitlistFiltersContext = createContext<WaitlistFiltersContextValue | null>(
  null,
)

export function WaitlistFiltersProvider({ children }: { children: ReactNode }) {
  const { closeMobileSidebar } = useAdminLayout()
  const [draftFilters, setDraftFilters] = useState<WaitlistSidebarFilters>(
    createDefaultWaitlistFilters,
  )
  const [appliedFilters, setAppliedFilters] = useState<WaitlistSidebarFilters>(
    createDefaultWaitlistFilters,
  )

  const applyFilters = useCallback(() => {
    setAppliedFilters(draftFilters)
    closeMobileSidebar()
  }, [draftFilters, closeMobileSidebar])

  const value = useMemo(
    () => ({
      draftFilters,
      setDraftFilters,
      appliedFilters,
      applyFilters,
    }),
    [draftFilters, appliedFilters, applyFilters],
  )

  return (
    <WaitlistFiltersContext.Provider value={value}>
      {children}
    </WaitlistFiltersContext.Provider>
  )
}

export function useWaitlistFilters(): WaitlistFiltersContextValue {
  const ctx = useContext(WaitlistFiltersContext)
  if (!ctx) {
    throw new Error('useWaitlistFilters must be used within WaitlistFiltersProvider')
  }
  return ctx
}
