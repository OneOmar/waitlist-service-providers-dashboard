import {
  Calendar,
  Mail,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  User,
  X,
} from 'lucide-react'
import { useId, useState } from 'react'

import { Badge, Button, Card, Modal } from '@/components/ui'
import type { WaitlistRecordType, WaitlistRow } from '@/types/waitlist'
import { cn } from '@/utils/cn'

export type UserDetailsModalProps = {
  onClose: () => void
  row: WaitlistRow
  recordType: WaitlistRecordType
  onOnboard?: (row: WaitlistRow) => void
  onReject?: (row: WaitlistRow) => void
}

function Divider() {
  return <div className="h-px w-full bg-border-default" role="presentation" />
}

function serviceTags(row: WaitlistRow) {
  return row.serviceOffering
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.toLowerCase())
}

export function UserDetailsModal({
  onClose,
  row,
  recordType,
  onOnboard,
  onReject,
}: UserDetailsModalProps) {
  const titleId = useId()
  const [notes, setNotes] = useState('')
  const [editingNotes, setEditingNotes] = useState(false)

  const badgePrimary =
    recordType === 'customers' ? 'Customer' : 'Service Provider'

  const displayName = 'CleanPro Solutions'
  const contactLine = `contact@${row.email.split('@')[1] ?? 'example.com'}`

  return (
    <Modal open onClose={onClose} labelledBy={titleId}>
      <Card padding="lg" elevated className="border-border-strong shadow-modal">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <User
              className="size-5 shrink-0 text-text-secondary"
              strokeWidth={1.75}
              aria-hidden
            />
            <h2
              id={titleId}
              className="text-section font-bold leading-section text-text-primary"
            >
              User Details
            </h2>
          </div>
          <button
            type="button"
            className="rounded-full p-1.5 text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            onClick={onClose}
            aria-label="Close user details"
          >
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold leading-tight text-text-primary">
              {displayName}
            </h3>
            <Badge variant="neutral">{badgePrimary}</Badge>
            <Badge variant="neutral">invited</Badge>
          </div>
          <p className="flex items-center gap-2 text-body text-text-secondary">
            <Mail className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
            <span>{contactLine}</span>
          </p>
        </div>

        <Divider />

        <section className="space-y-4 py-6" aria-labelledby={`${titleId}-contact`}>
          <h3
            id={`${titleId}-contact`}
            className="text-section font-bold leading-section text-text-primary"
          >
            Contact Information
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <p className="flex items-start gap-2 text-body text-text-secondary">
              <Mail className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} aria-hidden />
              <span>{row.email}</span>
            </p>
            <p className="flex items-start gap-2 text-body text-text-secondary">
              <Phone className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} aria-hidden />
              <span>{row.phone}</span>
            </p>
            <p className="flex items-start gap-2 text-body text-text-secondary">
              <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} aria-hidden />
              <span>United kingdom</span>
            </p>
            <p className="flex items-start gap-2 text-body text-text-secondary">
              <Calendar className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} aria-hidden />
              <span>Signed up {row.signupDate}</span>
            </p>
          </div>
        </section>

        <Divider />

        <section className="space-y-4 py-6" aria-labelledby={`${titleId}-customer`}>
          <h3
            id={`${titleId}-customer`}
            className="text-section font-bold leading-section text-text-primary"
          >
            Customer Details
          </h3>
          <p className="flex items-center gap-2 text-body text-text-primary">
            <User className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
            <span>
              {row.vendorType === 'Independent' ? 'individual' : 'company'}
            </span>
          </p>
          <div>
            <h4 className="text-section font-bold leading-section text-text-primary">
              User Details
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {serviceTags(row).map((tag) => (
                <span key={tag} className="text-body capitalize text-text-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-6" aria-labelledby={`${titleId}-notes`}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MessageSquare
                className="size-4 text-text-secondary"
                strokeWidth={1.75}
                aria-hidden
              />
              <h3
                id={`${titleId}-notes`}
                className="text-section font-bold leading-section text-text-primary"
              >
                Internal Notes
              </h3>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-label font-semibold text-text-primary transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 rounded-sm"
              onClick={() => setEditingNotes((v) => !v)}
            >
              <Pencil className="size-4" strokeWidth={1.75} aria-hidden />
              Edit
            </button>
          </div>
          <textarea
            readOnly={!editingNotes}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="No Note Added yet"
            rows={4}
            className={cn(
              'w-full resize-y rounded-input border border-border-default bg-surface-muted px-3 py-2 text-body text-text-primary',
              'placeholder:text-text-muted',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
              !editingNotes && 'cursor-default',
            )}
          />
        </section>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center sm:gap-4">
          <Button
            type="button"
            variant="primary"
            size="pill"
            radius="full"
            className="min-h-12 flex-1 sm:max-w-xs"
            onClick={() => {
              onOnboard?.(row)
              onClose()
            }}
          >
            Onboard
          </Button>
          <Button
            type="button"
            variant="danger"
            size="pill"
            radius="full"
            className="min-h-12 flex-1 sm:max-w-xs"
            onClick={() => {
              onReject?.(row)
              onClose()
            }}
          >
            Reject
          </Button>
        </div>
      </Card>
    </Modal>
  )
}
