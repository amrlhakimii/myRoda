import { useMemo, useState } from 'react'
import { TrendingUp, Wrench, Car as CarIcon } from 'lucide-react'
import { StatTile } from '@/components/common/StatTile'
import { Select } from '@/components/common/Select'
import { MonthlyExpenseChart } from '@/components/expenses/MonthlyExpenseChart'
import { FuelTrendChart } from '@/components/expenses/FuelTrendChart'
import { ServiceFrequencyChart } from '@/components/expenses/ServiceFrequencyChart'
import { useVehicles } from '@/hooks/useVehicles'
import { useServiceRecordsByUser } from '@/hooks/useServiceRecords'
import { useFuelRecordsByUser } from '@/hooks/useFuelRecords'
import { buildMonthlyExpenses, buildServiceFrequency } from '@/utils/expenseCalculations'
import { formatCurrency } from '@/utils/formatters'

export function ExpensesPage() {
  const { data: vehicles } = useVehicles()
  const { data: serviceRecords } = useServiceRecordsByUser()
  const { data: fuelRecords } = useFuelRecordsByUser()
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('all')

  const filteredServiceRecords =
    selectedVehicleId === 'all'
      ? serviceRecords
      : serviceRecords.filter((r) => r.vehicleId === selectedVehicleId)
  const filteredFuelRecords =
    selectedVehicleId === 'all' ? fuelRecords : fuelRecords.filter((r) => r.vehicleId === selectedVehicleId)

  const monthlyExpenses = useMemo(
    () => buildMonthlyExpenses(filteredServiceRecords, filteredFuelRecords),
    [filteredServiceRecords, filteredFuelRecords],
  )
  const serviceFrequency = useMemo(
    () => buildServiceFrequency(filteredServiceRecords),
    [filteredServiceRecords],
  )
  const fuelTrend = useMemo(
    () => monthlyExpenses.map((m) => ({ label: m.label, cost: m.fuel })),
    [monthlyExpenses],
  )

  const highestServiceCost = filteredServiceRecords.reduce((max, r) => Math.max(max, r.totalCost), 0)
  const monthsWithSpend = monthlyExpenses.filter((m) => m.service + m.fuel > 0).length || 1
  const avgMonthlySpend =
    monthlyExpenses.reduce((sum, m) => sum + m.service + m.fuel, 0) / monthsWithSpend
  const totalCostSelected =
    filteredServiceRecords.reduce((sum, r) => sum + r.totalCost, 0) +
    filteredFuelRecords.reduce((sum, r) => sum + r.totalPrice, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Expenses</h1>
          <p className="mt-1 text-sm text-navy-500">Spending analytics across service and fuel.</p>
        </div>
        <Select
          value={selectedVehicleId}
          onChange={(e) => setSelectedVehicleId(e.target.value)}
          className="w-56"
        >
          <option value="all">All vehicles</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nickname || `${v.brand} ${v.model}`}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile
          label="Highest service cost"
          value={formatCurrency(highestServiceCost)}
          icon={<Wrench size={18} />}
        />
        <StatTile
          label="Avg. monthly spending"
          value={formatCurrency(avgMonthlySpend)}
          icon={<TrendingUp size={18} />}
        />
        <StatTile
          label={selectedVehicleId === 'all' ? 'Total cost (all vehicles)' : 'Total cost (this vehicle)'}
          value={formatCurrency(totalCostSelected)}
          icon={<CarIcon size={18} />}
          tone="navy"
        />
      </div>

      <MonthlyExpenseChart data={monthlyExpenses} />
      <div className="grid gap-6 lg:grid-cols-2">
        <FuelTrendChart data={fuelTrend} />
        <ServiceFrequencyChart data={serviceFrequency} />
      </div>
    </div>
  )
}
