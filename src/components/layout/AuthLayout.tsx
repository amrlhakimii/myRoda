import type { ReactNode } from 'react'
import { Logo } from '@/components/common/Logo'
import { FloatingBackground } from '@/components/common/FloatingBackground'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="relative grid min-h-svh grid-cols-1 overflow-hidden bg-navy-950 lg:grid-cols-2">
      <FloatingBackground />
      <div className="relative hidden flex-col justify-between border-r border-white/8 p-10 lg:flex">
        <Logo variant="full" inverted size={38} className="relative" />
        <div className="relative">
          <h2 className="font-display text-3xl leading-tight font-extrabold text-mist-50">
            Track Every Service.
            <br />
            Every Fuel.
            <br />
            Every Journey.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-mist-400">
            One place for every Malaysian vehicle owner to log servicing, fuel, and costs — never
            lose a receipt again.
          </p>
        </div>
        <p className="relative text-xs text-mist-500">© {new Date().getFullYear()} myRoda</p>
      </div>
      <div className="relative flex flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo variant="full" size={34} />
          </div>
          <div className="glass-surface rounded-3xl p-8 shadow-soft-lg">
            <h1 className="font-display text-2xl font-extrabold text-mist-50">{title}</h1>
            <p className="mt-1.5 text-sm text-mist-400">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
