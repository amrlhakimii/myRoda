import { LogOut, Sparkles, FileDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { ComingSoon } from '@/components/common/ComingSoon'
import { useAuthStore } from '@/store/authStore'
import { logout } from '@/services/auth/authService'
import { useToastStore } from '@/store/toastStore'

export function SettingsPage() {
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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-navy-900">Settings</h1>
        <p className="mt-1 text-sm text-navy-500">
          Manage your account and explore what's next for myRoda.
        </p>
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-bold text-navy-800">Account</h3>
        <p className="mt-2 text-sm text-navy-600">{user?.email}</p>
        <Button variant="secondary" size="sm" className="mt-4" onClick={handleLogout}>
          <LogOut size={15} /> Log out
        </Button>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <ComingSoon
          icon={<Sparkles size={20} />}
          title="AI Maintenance Assistant"
          description="Predictive maintenance suggestions, cost estimates, and anomaly detection based on your service history."
        />
        <ComingSoon
          icon={<FileDown size={20} />}
          title="PDF Maintenance Reports"
          description="Export a shareable PDF summary of any vehicle's full service and expense history."
        />
      </div>
    </div>
  )
}
