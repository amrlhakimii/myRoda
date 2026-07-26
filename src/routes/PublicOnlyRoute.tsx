import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { LoadingScreen } from '@/components/common/LoadingScreen'

export function PublicOnlyRoute() {
  const user = useAuthStore((s) => s.user)
  const isInitialized = useAuthStore((s) => s.isInitialized)

  if (!isInitialized) return <LoadingScreen />
  if (user) return <Navigate to="/dashboard" replace />
  return <Outlet />
}
