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
    <header
      className="sticky top-0 z-30 flex items-center justify-between border-b border-white/8 bg-navy-950/70 px-4 backdrop-blur-xl sm:px-6"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)', paddingBottom: '0.75rem' }}
    >
      <Logo variant="full" size={30} />
      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pr-3 pl-1 hover:bg-white/10"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-steel-400 to-steel-600 text-sm font-bold text-navy-950">
            {user?.email ? user.email[0]?.toUpperCase() : <UserIcon size={16} />}
          </span>
          <span className="hidden max-w-40 truncate text-sm font-medium text-mist-100 sm:inline">
            {user?.email}
          </span>
          <ChevronDown size={14} className="text-mist-500" />
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="glass-surface absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl shadow-soft-lg">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10"
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
