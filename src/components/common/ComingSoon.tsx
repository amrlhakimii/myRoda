import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

interface ComingSoonProps {
  title: string
  description: string
  icon?: ReactNode
}

export function ComingSoon({ title, description, icon }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-blush-200 bg-gradient-to-br from-blush-50 to-white px-6 py-10 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blush-100 text-blush-700">
        {icon ?? <Sparkles size={20} />}
      </div>
      <span className="rounded-full bg-navy-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
        Coming soon
      </span>
      <h3 className="text-base font-semibold text-navy-800">{title}</h3>
      <p className="max-w-sm text-sm text-navy-500">{description}</p>
    </div>
  )
}
