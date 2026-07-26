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
  navy: 'bg-navy-700 text-white',
  steel: 'bg-white text-navy-900',
  blush: 'bg-blush-50 text-navy-900',
}

export function StatTile({ label, value, icon, trend, tone = 'steel' }: StatTileProps) {
  return (
    <div className={clsx('rounded-2xl p-5 shadow-soft', toneClasses[tone])}>
      <div className="flex items-center justify-between">
        <span
          className={clsx(
            'text-sm font-medium',
            tone === 'navy' ? 'text-mist-200' : 'text-navy-500',
          )}
        >
          {label}
        </span>
        {icon && <span className={tone === 'navy' ? 'text-blush-300' : 'text-steel-500'}>{icon}</span>}
      </div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight">{value}</div>
      {trend && (
        <div className={clsx('mt-1 text-xs font-medium', tone === 'navy' ? 'text-mist-300' : 'text-navy-400')}>
          {trend}
        </div>
      )}
    </div>
  )
}
