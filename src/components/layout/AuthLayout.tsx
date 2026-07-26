import type { ReactNode } from 'react'
import { Logo } from '@/components/common/Logo'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-navy-800 p-10 lg:flex">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-steel-600/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-blush-400/20 blur-3xl" />
        <Logo variant="full" inverted size={38} className="relative" />
        <div className="relative">
          <h2 className="text-3xl leading-tight font-extrabold text-white">
            Track Every Service.
            <br />
            Every Fuel.
            <br />
            Every Journey.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-mist-300">
            One place for every Malaysian vehicle owner to log servicing, fuel, and costs — never
            lose a receipt again.
          </p>
        </div>
        <p className="relative text-xs text-mist-400">© {new Date().getFullYear()} myRoda</p>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo variant="full" size={34} />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900">{title}</h1>
          <p className="mt-1.5 text-sm text-navy-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
