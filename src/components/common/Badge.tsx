import type { ReactNode } from 'react'
import { clsx } from 'clsx'

type Tone = 'navy' | 'steel' | 'blush' | 'success' | 'warning' | 'danger' | 'neutral'

const toneClasses: Record<Tone, string> = {
  navy: 'bg-navy-700 text-white',
  steel: 'bg-steel-100 text-steel-800',
  blush: 'bg-blush-100 text-blush-800',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-700',
  neutral: 'bg-mist-200 text-navy-700',
}

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
