import { Bell, Menu, MessageCircle } from 'lucide-react'

import { cn } from '@/utils/cn'

import { useAdminLayout } from './AdminLayoutContext'

const NAV_ITEMS = [
  'Service Dashboard',
  'Finance Forecast',
  'Human Resources',
  'Users',
  'Compliances & Verification',
] as const

const ACTIVE_NAV = 'Human Resources'

export function AdminHeader() {
  const { openMobileSidebar } = useAdminLayout()

  return (
    <header className="flex shrink-0 items-center gap-2 border-b border-border-default bg-surface-elevated px-4 py-3 sm:gap-4 sm:px-content-x sm:py-4">
      <button
        type="button"
        className="inline-flex shrink-0 rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus md:hidden"
        aria-label="Open filters"
        onClick={openMobileSidebar}
      >
        <Menu className="size-6" strokeWidth={1.75} />
      </button>
      <nav
        aria-label="Primary navigation"
        className={cn(
          'flex min-w-0 flex-1 flex-nowrap items-center gap-4 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 md:flex-wrap md:overflow-visible',
          '[&::-webkit-scrollbar]:hidden',
        )}
      >
        {NAV_ITEMS.map((item) => {
          const active = item === ACTIVE_NAV
          return (
            <button
              key={item}
              type="button"
              className={cn(
                'relative shrink-0 whitespace-nowrap pb-1 text-nav leading-nav transition-colors',
                active
                  ? 'font-semibold text-brand-primary'
                  : 'font-medium text-text-secondary hover:text-text-primary',
              )}
            >
              {item}
              {active ? (
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand-primary"
                  aria-hidden
                />
              ) : null}
            </button>
          )
        })}
      </nav>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
        <button
          type="button"
          className="rounded-full p-2 text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          aria-label="Notifications"
        >
          <Bell className="size-5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className="rounded-full p-2 text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          aria-label="Messages"
        >
          <MessageCircle className="size-5" strokeWidth={1.75} />
        </button>
        <div className="flex items-center gap-2 pl-0.5 sm:gap-3 sm:pl-2">
          <img
            src="https://i.pravatar.cc/48?img=12"
            alt=""
            width={40}
            height={40}
            className="size-9 rounded-full object-cover ring-1 ring-border-default sm:size-10"
          />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-label font-semibold leading-label text-text-primary">
              Max Smith
            </span>
            <span className="text-caption leading-caption text-text-secondary">
              London, UK
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
