import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { Plus, Car } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { UpcomingReminders } from '@/components/dashboard/UpcomingReminders'
import { useVehicles } from '@/hooks/useVehicles'
import { useServiceRecordsByUser } from '@/hooks/useServiceRecords'
import { useFuelRecordsByUser } from '@/hooks/useFuelRecords'
import { useRemindersByUser } from '@/hooks/useReminders'
import { useAuthStore } from '@/store/authStore'

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const { data: vehicles, isLoading: vehiclesLoading } = useVehicles()
  const { data: serviceRecords } = useServiceRecordsByUser()
  const { data: fuelRecords } = useFuelRecordsByUser()
  const { data: reminders } = useRemindersByUser()

  const vehicleNameById = useMemo(
    () => new Map(vehicles.map((v) => [v.id, v.nickname || `${v.brand} ${v.model}`])),
    [vehicles],
  )

  const totalServiceCost = serviceRecords.reduce((sum, r) => sum + r.totalCost, 0)
  const totalFuelCost = fuelRecords.reduce((sum, r) => sum + r.totalPrice, 0)

  const currentMonth = dayjs().format('YYYY-MM')
  const monthlyExpense =
    serviceRecords
      .filter((r) => r.date.startsWith(currentMonth))
      .reduce((sum, r) => sum + r.totalCost, 0) +
    fuelRecords.filter((r) => r.date.startsWith(currentMonth)).reduce((sum, r) => sum + r.totalPrice, 0)

  const latestService = [...serviceRecords].sort((a, b) => b.date.localeCompare(a.date))[0]
  const latestFuel = [...fuelRecords].sort((a, b) => b.date.localeCompare(a.date))[0]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-mist-50">
            {`Welcome back${user?.email ? `, ${user.email.split('@')[0]}` : ''}`}
          </h1>
          <p className="mt-1 text-sm text-mist-500">Here's how your fleet is doing.</p>
        </div>
        <Link to="/vehicles">
          <Button>
            <Plus size={18} /> Add vehicle
          </Button>
        </Link>
      </div>

      {!vehiclesLoading && vehicles.length === 0 ? (
        <EmptyState
          icon={<Car size={32} />}
          title="Add your first vehicle"
          description="Register a car or motorcycle to start tracking service, fuel, and expenses."
          action={
            <Link to="/vehicles">
              <Button>Add vehicle</Button>
            </Link>
          }
        />
      ) : (
        <>
          <SummaryCards
            totalVehicles={vehicles.length}
            totalServiceCost={totalServiceCost}
            totalFuelCost={totalFuelCost}
            monthlyExpense={monthlyExpense}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <RecentActivity
              latestService={latestService}
              latestFuel={latestFuel}
              vehicleNameById={vehicleNameById}
            />
            <UpcomingReminders reminders={reminders} vehicleNameById={vehicleNameById} />
          </div>
        </>
      )}
    </div>
  )
}
