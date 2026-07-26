import { Link } from 'react-router-dom'
import { Car, Bike, Gauge, ChevronRight } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { VEHICLE_TYPE_LABELS } from '@/utils/constants'
import { formatMileage } from '@/utils/formatters'
import type { Vehicle } from '@/types/vehicle'

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const Icon = vehicle.vehicleType === 'car' ? Car : Bike
  return (
    <Link to={`/vehicles/${vehicle.id}`}>
      <Card className="flex items-center gap-4 p-5 transition-shadow hover:shadow-soft-lg">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-steel-50 text-steel-600">
          <Icon size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-bold text-mist-50">
              {vehicle.nickname || `${vehicle.brand} ${vehicle.model}`}
            </h3>
            <Badge tone="steel">{VEHICLE_TYPE_LABELS[vehicle.vehicleType]}</Badge>
          </div>
          <p className="mt-0.5 truncate text-sm text-mist-500">
            {vehicle.brand} {vehicle.model} · {vehicle.year} · {vehicle.registrationNumber}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-mist-500">
            <Gauge size={13} /> {formatMileage(vehicle.mileage)}
          </p>
        </div>
        <ChevronRight size={18} className="shrink-0 text-mist-400" />
      </Card>
    </Link>
  )
}
