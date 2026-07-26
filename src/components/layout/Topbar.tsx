import { useState } from 'react'
import { LogOut, User as UserIcon, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/common/Logo'
import { useAuthStore } from '@/store/authStore'
import { logout } from '@/services/auth/authService'
import { useToastStore } from '@/store/toastStore'

export function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()
  const pushToast = useToastStore((s) => s.push)

  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      pushToast(error instanceof Error ? error.message : 'Failed to log out', 'error')
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-mist-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <div className="md:hidden">
        <Logo variant="full" size={30} />
      </div>
      <div className="hidden md:block" />
      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-mist-200 py-1 pl-1 pr-3 hover:bg-mist-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-700 text-sm font-bold text-white">
            {user?.email ? user.email[0]?.toUpperCase() : <UserIcon size={16} />}
          </span>
          <span className="hidden max-w-40 truncate text-sm font-medium text-navy-800 sm:inline">
            {user?.email}
          </span>
          <ChevronDown size={14} className="text-navy-400" />
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-mist-200 bg-white shadow-soft-lg">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} /> Log out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
