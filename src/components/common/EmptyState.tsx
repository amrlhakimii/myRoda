import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center">
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-steel-500/15 bg-steel-500/8 text-steel-300">
          {icon}
        </div>
      )}
      <h3 className="font-display text-base font-bold text-mist-100">{title}</h3>
      {description && <p className="max-w-sm text-sm text-mist-500">{description}</p>}
      {action}
    </div>
  )
}
