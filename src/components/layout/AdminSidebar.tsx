import {
  Button,
  Checkbox,
  DateField,
  TextField,
} from '@/components/ui'
import { useWaitlistFilters } from '@/context/WaitlistFiltersContext'
import { cn } from '@/utils/cn'

import { useAdminLayout } from './AdminLayoutContext'

export function AdminSidebar() {
  const { mobileSidebarOpen } = useAdminLayout()
  const { draftFilters, setDraftFilters, applyFilters } = useWaitlistFilters()

  return (
    <aside
      aria-label="Filters and sidebar navigation"
      className={cn(
        'flex h-full min-h-0 flex-col border-r border-border-default bg-surface-sidebar px-5 py-6',
        'w-sidebar shrink-0',
        'fixed inset-y-0 left-0 z-50 max-h-[100dvh] shadow-xl transition-transform duration-200 ease-out md:static md:z-0 md:max-h-none md:translate-x-0 md:shadow-none',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      )}
    >
      <div className="mb-8 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
        <span className="font-serif text-2xl font-semibold italic text-brand-primary">
          gler
        </span>
        <span className="text-xs leading-none text-amber-500" aria-hidden>
          ★
        </span>
        <span className="text-sm font-medium text-brand-primary">Admin Panel</span>
      </div>

      <div className="mb-6">
        <span className="inline-block rounded-lg bg-surface-muted px-3 py-2 text-label font-semibold leading-label text-text-primary">
          User Management
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto pb-2">
        <TextField
          label="Postcode"
          placeholder="ZIP"
          value={draftFilters.postcode}
          onChange={(e) =>
            setDraftFilters((s) => ({ ...s, postcode: e.target.value }))
          }
        />

        <fieldset className="flex flex-col gap-3 border-0 p-0">
          <legend className="mb-1 text-label font-semibold leading-label text-text-primary">
            Registration Status
          </legend>
          <Checkbox
            label="Onboarded"
            checked={draftFilters.statusOnboarded}
            onChange={(e) =>
              setDraftFilters((s) => ({
                ...s,
                statusOnboarded: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Rejected"
            checked={draftFilters.statusRejected}
            onChange={(e) =>
              setDraftFilters((s) => ({
                ...s,
                statusRejected: e.target.checked,
              }))
            }
          />
        </fieldset>

        <fieldset className="flex flex-col gap-3 border-0 p-0">
          <legend className="mb-1 text-label font-semibold leading-label text-text-primary">
            Date Registered
          </legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DateField
              label="Start"
              type="date"
              value={draftFilters.dateStart}
              onChange={(e) =>
                setDraftFilters((s) => ({ ...s, dateStart: e.target.value }))
              }
            />
            <DateField
              label="End"
              type="date"
              value={draftFilters.dateEnd}
              onChange={(e) =>
                setDraftFilters((s) => ({ ...s, dateEnd: e.target.value }))
              }
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3 border-0 p-0">
          <legend className="mb-1 text-label font-semibold leading-label text-text-primary">
            Vendor Type
          </legend>
          <Checkbox
            label="Independent"
            checked={draftFilters.vendorIndependent}
            onChange={(e) =>
              setDraftFilters((s) => ({
                ...s,
                vendorIndependent: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Company"
            checked={draftFilters.vendorCompany}
            onChange={(e) =>
              setDraftFilters((s) => ({
                ...s,
                vendorCompany: e.target.checked,
              }))
            }
          />
        </fieldset>

        <fieldset className="flex flex-col gap-3 border-0 p-0">
          <legend className="mb-1 text-label font-semibold leading-label text-text-primary">
            Service Offering
          </legend>
          <Checkbox
            label="Housekeeping"
            checked={draftFilters.serviceHousekeeping}
            onChange={(e) =>
              setDraftFilters((s) => ({
                ...s,
                serviceHousekeeping: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Window Cleaning"
            checked={draftFilters.serviceWindowCleaning}
            onChange={(e) =>
              setDraftFilters((s) => ({
                ...s,
                serviceWindowCleaning: e.target.checked,
              }))
            }
          />
          <Checkbox
            label="Car Valet"
            checked={draftFilters.serviceCarValet}
            onChange={(e) =>
              setDraftFilters((s) => ({
                ...s,
                serviceCarValet: e.target.checked,
              }))
            }
          />
        </fieldset>

        <div className="mt-auto pt-4">
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => applyFilters()}
          >
            Filter
          </Button>
        </div>
      </div>
    </aside>
  )
}
