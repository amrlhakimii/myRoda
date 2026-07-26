import { Gauge, Fuel, Wallet } from 'lucide-react'
import { StatTile } from '@/components/common/StatTile'
import { averageConsumption, averageMonthlyFuelCost, computeConsumption } from '@/utils/fuelCalculations'
import { formatCurrency } from '@/utils/formatters'
import type { FuelRecord } from '@/types/fuel'

export function ConsumptionStats({ records }: { records: FuelRecord[] }) {
  const entries = computeConsumption(records)
  const avgKmL = averageConsumption(entries)
  const avgMonthlyCost = averageMonthlyFuelCost(records)
  const totalLitres = records.reduce((sum, r) => sum + r.litres, 0)

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <StatTile
        label="Avg. consumption"
        value={avgKmL ? `${avgKmL.toFixed(1)} km/L` : '—'}
        icon={<Gauge size={18} />}
      />
      <StatTile
        label="Avg. monthly fuel cost"
        value={formatCurrency(avgMonthlyCost)}
        icon={<Wallet size={18} />}
      />
      <StatTile label="Total litres logged" value={`${totalLitres.toFixed(1)} L`} icon={<Fuel size={18} />} />
    </div>
  )
}
