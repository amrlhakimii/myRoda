import { Logo } from './Logo'

export function LoadingScreen() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-mist-100">
      <div className="animate-pulse">
        <Logo variant="mark" size={56} />
      </div>
      <p className="text-sm font-medium text-navy-500">Loading myRoda…</p>
    </div>
  )
}
