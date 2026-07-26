import type { ReactNode } from 'react'
import { clsx } from 'clsx'

interface StatTileProps {
  label: string
  value: string
  icon?: ReactNode
  trend?: string
  tone?: 'navy' | 'steel' | 'blush'
}

const toneClasses: Record<NonNullable<StatTileProps['tone']>, string> = {
  navy: 'bg-gradient-to-br from-steel-600/25 to-navy-800/40 border-steel-400/25 shadow-glow-steel',
  steel: 'glass-surface',
  blush: 'bg-blush-400/8 border-blush-400/20',
}

const iconToneClasses: Record<NonNullable<StatTileProps['tone']>, string> = {
  navy: 'text-steel-300',
  steel: 'text-steel-400',
  blush: 'text-blush-300',
}

export function StatTile({ label, value, icon, trend, tone = 'steel' }: StatTileProps) {
  return (
    <div className={clsx('rounded-2xl border p-5 shadow-soft', toneClasses[tone])}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-mist-400">{label}</span>
        {icon && <span className={iconToneClasses[tone]}>{icon}</span>}
      </div>
      <div className="font-display mt-2 text-2xl font-extrabold tracking-tight text-mist-50">{value}</div>
      {trend && <div className="mt-1 text-xs font-medium text-mist-500">{trend}</div>}
    </div>
  )
}
