import { useState } from 'react'
import { Plus, Car } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { EmptyState } from '@/components/common/EmptyState'
import { VehicleForm } from '@/components/forms/VehicleForm'
import { VehicleCard } from '@/components/vehicle/VehicleCard'
import { useVehicles } from '@/hooks/useVehicles'
import { createVehicle } from '@/services/firestore/vehicles'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import type { VehicleFormValues } from '@/lib/validation/vehicle'

export function VehiclesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const userId = useAuthStore((s) => s.user?.uid)
  const { data: vehicles, isLoading } = useVehicles()
  const pushToast = useToastStore((s) => s.push)

  function handleCreate(values: VehicleFormValues) {
    if (!userId) return
    // Close optimistically: Firestore reflects the write in the list instantly via
    // onSnapshot — don't block the modal on the full server round-trip.
    setModalOpen(false)
    createVehicle(userId, { ...values, nickname: values.nickname || undefined })
      .then(() => pushToast('Vehicle added'))
      .catch((error) =>
        pushToast(error instanceof Error ? error.message : 'Failed to add vehicle', 'error'),
      )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Vehicles</h1>
          <p className="mt-1 text-sm text-navy-500">Manage every car and motorcycle you own.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={18} /> Add vehicle
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-mist-200" />
          ))}
        </div>
      ) : vehicles.length === 0 ? (
        <EmptyState
          icon={<Car size={32} />}
          title="No vehicles yet"
          description="Add your first car or motorcycle to start tracking service, fuel, and expenses."
          action={<Button onClick={() => setModalOpen(true)}>Add your first vehicle</Button>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add vehicle">
        <VehicleForm onSubmit={handleCreate} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  )
}
