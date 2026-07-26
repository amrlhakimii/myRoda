import { type ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = { sm: 'sm:max-w-sm', md: 'sm:max-w-lg', lg: 'sm:max-w-2xl' }

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="animate-fade-in fixed inset-0 z-50 flex items-end justify-center bg-navy-950/40 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        className={clsx(
          'animate-slide-up max-h-[90svh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-soft-lg sm:rounded-3xl',
          sizeClasses[size],
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          {title && <h2 className="text-lg font-bold text-navy-900">{title}</h2>}
          <button
            onClick={onClose}
            className="ml-auto shrink-0 rounded-full p-1.5 text-navy-500 hover:bg-mist-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}
