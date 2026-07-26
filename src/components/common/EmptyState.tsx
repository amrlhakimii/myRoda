import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-mist-300 bg-mist-50 px-6 py-12 text-center">
      {icon && <div className="text-steel-400">{icon}</div>}
      <h3 className="text-base font-semibold text-navy-800">{title}</h3>
      {description && <p className="max-w-sm text-sm text-navy-500">{description}</p>}
      {action}
    </div>
  )
}
