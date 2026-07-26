import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicOnlyRoute } from './PublicOnlyRoute'
import { AppShell } from '@/components/layout/AppShell'
import { LoginPage } from '@/pages/auth/LoginPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { VehiclesPage } from '@/pages/vehicles/VehiclesPage'
import { VehicleDetailPage } from '@/pages/vehicles/VehicleDetailPage'
import { SettingsPage } from '@/pages/settings/SettingsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const CalendarPage = lazy(() =>
  import('@/pages/calendar/CalendarPage').then((m) => ({ default: m.CalendarPage })),
)
const ExpensesPage = lazy(() =>
  import('@/pages/expenses/ExpensesPage').then((m) => ({ default: m.ExpensesPage })),
)

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="/register" element={<Navigate to="/login" replace />} />
      <Route path="/reset-password" element={<Navigate to="/login" replace />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:vehicleId" element={<VehicleDetailPage />} />
          <Route
            path="/calendar"
            element={
              <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white/5" />}>
                <CalendarPage />
              </Suspense>
            }
          />
          <Route
            path="/expenses"
            element={
              <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white/5" />}>
                <ExpensesPage />
              </Suspense>
            }
          />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
