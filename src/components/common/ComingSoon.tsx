import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

interface ComingSoonProps {
  title: string
  description: string
  icon?: ReactNode
}

export function ComingSoon({ title, description, icon }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-blush-400/20 bg-gradient-to-br from-blush-400/10 to-transparent px-6 py-10 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blush-400/15 text-blush-300">
        {icon ?? <Sparkles size={20} />}
      </div>
      <span className="rounded-full bg-gradient-to-r from-steel-400 to-steel-600 px-3 py-1 text-xs font-bold tracking-wide text-navy-950 uppercase">
        Coming soon
      </span>
      <h3 className="font-display text-base font-bold text-mist-100">{title}</h3>
      <p className="max-w-sm text-sm text-mist-500">{description}</p>
    </div>
  )
}
