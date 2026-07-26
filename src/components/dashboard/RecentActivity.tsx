import { Link } from 'react-router-dom'
import { Wrench, Fuel } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { formatCurrency, formatDate } from '@/utils/formatters'
import type { ServiceRecord } from '@/types/service'
import type { FuelRecord } from '@/types/fuel'

interface RecentActivityProps {
  latestService?: ServiceRecord
  latestFuel?: FuelRecord
  vehicleNameById: Map<string, string>
}

export function RecentActivity({ latestService, latestFuel, vehicleNameById }: RecentActivityProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-navy-800">Recent activity</h3>
      <div className="mt-3 flex flex-col gap-2">
        {latestService && (
          <Link
            to={`/vehicles/${latestService.vehicleId}`}
            className="flex items-center gap-3 rounded-xl bg-mist-50 px-3.5 py-3 hover:bg-mist-100"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-steel-100 text-steel-700">
              <Wrench size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-navy-800">{latestService.workshopName}</p>
              <p className="text-xs text-navy-400">
                {vehicleNameById.get(latestService.vehicleId)} · {formatDate(latestService.date)}
              </p>
            </div>
            <span className="text-sm font-bold text-navy-800">{formatCurrency(latestService.totalCost)}</span>
          </Link>
        )}
        {latestFuel && (
          <Link
            to={`/vehicles/${latestFuel.vehicleId}`}
            className="flex items-center gap-3 rounded-xl bg-mist-50 px-3.5 py-3 hover:bg-mist-100"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blush-100 text-blush-700">
              <Fuel size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-navy-800">{latestFuel.petrolType} refuel</p>
              <p className="text-xs text-navy-400">
                {vehicleNameById.get(latestFuel.vehicleId)} · {formatDate(latestFuel.date)}
              </p>
            </div>
            <span className="text-sm font-bold text-navy-800">{formatCurrency(latestFuel.totalPrice)}</span>
          </Link>
        )}
        {!latestService && !latestFuel && (
          <p className="text-sm text-navy-500">No activity yet. Add a service or fuel record to see it here.</p>
        )}
      </div>
    </Card>
  )
}
