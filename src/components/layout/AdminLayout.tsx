import { useEffect, type ReactNode } from 'react'

import { WaitlistFiltersProvider } from '@/context/WaitlistFiltersContext'

import { AdminHeader } from './AdminHeader'
import { AdminLayoutProvider, useAdminLayout } from './AdminLayoutContext'
import { AdminSidebar } from './AdminSidebar'

type AdminLayoutProps = {
  children: ReactNode
}

function AdminLayoutShell({ children }: AdminLayoutProps) {
  const { mobileSidebarOpen, closeMobileSidebar } = useAdminLayout()

  useEffect(() => {
    if (!mobileSidebarOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileSidebarOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (mq.matches) closeMobileSidebar()
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [closeMobileSidebar])

  useEffect(() => {
    if (!mobileSidebarOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileSidebar()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileSidebarOpen, closeMobileSidebar])

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="relative flex min-h-0 flex-1 flex-col md:flex-row">
        {mobileSidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            aria-label="Close filters panel"
            onClick={closeMobileSidebar}
          />
        ) : null}
        <AdminSidebar />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminLayoutProvider>
      <WaitlistFiltersProvider>
        <AdminLayoutShell>{children}</AdminLayoutShell>
      </WaitlistFiltersProvider>
    </AdminLayoutProvider>
  )
}
