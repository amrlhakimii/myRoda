import { Outlet } from 'react-router-dom'
import { Topbar } from './Topbar'
import { BottomNav } from './BottomNav'
import { FloatingBackground } from '@/components/common/FloatingBackground'

export function AppShell() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-navy-950">
      <FloatingBackground />
      <Topbar />
      <main className="relative flex-1 px-4 pt-5 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
