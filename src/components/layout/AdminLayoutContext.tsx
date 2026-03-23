/* eslint-disable react-refresh/only-export-components -- context + hook pair */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type AdminLayoutContextValue = {
  mobileSidebarOpen: boolean
  openMobileSidebar: () => void
  closeMobileSidebar: () => void
}

const AdminLayoutContext = createContext<AdminLayoutContextValue | null>(null)

export function AdminLayoutProvider({ children }: { children: ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const openMobileSidebar = useCallback(() => setMobileSidebarOpen(true), [])
  const closeMobileSidebar = useCallback(() => setMobileSidebarOpen(false), [])

  const value = useMemo(
    () => ({
      mobileSidebarOpen,
      openMobileSidebar,
      closeMobileSidebar,
    }),
    [mobileSidebarOpen, openMobileSidebar, closeMobileSidebar],
  )

  return (
    <AdminLayoutContext.Provider value={value}>
      {children}
    </AdminLayoutContext.Provider>
  )
}

export function useAdminLayout(): AdminLayoutContextValue {
  const ctx = useContext(AdminLayoutContext)
  if (!ctx) {
    throw new Error('useAdminLayout must be used within AdminLayoutProvider')
  }
  return ctx
}
