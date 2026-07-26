import { Car, Wrench, Fuel, TrendingUp } from 'lucide-react'
import { StatTile } from '@/components/common/StatTile'
import { formatCurrency } from '@/utils/formatters'

interface SummaryCardsProps {
  totalVehicles: number
  totalServiceCost: number
  totalFuelCost: number
  monthlyExpense: number
}

export function SummaryCards({
  totalVehicles,
  totalServiceCost,
  totalFuelCost,
  monthlyExpense,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile label="Vehicles tracked" value={String(totalVehicles)} icon={<Car size={18} />} tone="navy" />
      <StatTile label="Total service cost" value={formatCurrency(totalServiceCost)} icon={<Wrench size={18} />} />
      <StatTile label="Total fuel cost" value={formatCurrency(totalFuelCost)} icon={<Fuel size={18} />} />
      <StatTile
        label="This month's spend"
        value={formatCurrency(monthlyExpense)}
        icon={<TrendingUp size={18} />}
        tone="blush"
      />
    </div>
  )
}
