import type { ReactNode } from 'react'
import { clsx } from 'clsx'

type Tone = 'navy' | 'steel' | 'blush' | 'success' | 'warning' | 'danger' | 'neutral'

const toneClasses: Record<Tone, string> = {
  navy: 'bg-navy-600/40 text-mist-100 border border-white/10',
  steel: 'bg-steel-500/20 text-steel-300',
  blush: 'bg-blush-400/20 text-blush-300',
  success: 'bg-emerald-500/20 text-emerald-300',
  warning: 'bg-amber-500/20 text-amber-300',
  danger: 'bg-red-500/20 text-red-400',
  neutral: 'bg-white/8 text-mist-300',
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
