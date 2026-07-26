import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { clsx } from 'clsx'
import { useToastStore, type Toast } from '@/store/toastStore'

const icons: Record<Toast['variant'], typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

const toneClasses: Record<Toast['variant'], string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  info: 'border-steel-200 bg-steel-50 text-navy-800',
}

export function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts)
  const dismiss = useToastStore((s) => s.dismiss)

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:right-4 sm:left-auto sm:items-end">
      {toasts.map((toast) => {
        const Icon = icons[toast.variant]
        return (
          <div
            key={toast.id}
            className={clsx(
              'animate-slide-up pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-xl border px-4 py-3 shadow-soft-lg',
              toneClasses[toast.variant],
            )}
          >
            <Icon size={18} className="mt-0.5 shrink-0" />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss"
              className="shrink-0 opacity-60 hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
