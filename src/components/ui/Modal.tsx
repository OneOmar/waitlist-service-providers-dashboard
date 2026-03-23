import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/utils/cn'

export type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  /** Root class for the fixed overlay (e.g. z-index). */
  overlayClassName?: string
  /** `id` of the visible title element for `aria-labelledby`. */
  labelledBy?: string
}

export function Modal({
  open,
  onClose,
  children,
  className,
  overlayClassName,
  labelledBy,
}: ModalProps) {

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        overlayClassName,
      )}
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/40 transition-opacity hover:bg-black/45"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          'relative z-10 max-h-[min(90vh,900px)] w-full max-w-[640px] overflow-y-auto',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
