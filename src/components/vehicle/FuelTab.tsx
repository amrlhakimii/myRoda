import { useState } from 'react'
import { Plus, Fuel as FuelIcon, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { FuelForm } from '@/components/forms/FuelForm'
import { ConsumptionStats } from '@/components/fuel/ConsumptionStats'
import { useFuelRecords } from '@/hooks/useFuelRecords'
import { createFuelRecord, deleteFuelRecord, updateFuelRecord } from '@/services/firestore/fuelRecords'
import { bumpVehicleMileage } from '@/services/firestore/vehicles'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import { formatCurrency, formatDate, formatMileage } from '@/utils/formatters'
import { computeConsumption } from '@/utils/fuelCalculations'
import type { Vehicle } from '@/types/vehicle'
import type { FuelRecord } from '@/types/fuel'
import type { FuelFormValues } from '@/lib/validation/fuel'

export function FuelTab({ vehicle }: { vehicle: Vehicle }) {
  const userId = useAuthStore((s) => s.user?.uid)
  const { data: records, isLoading } = useFuelRecords(vehicle.id)
  const pushToast = useToastStore((s) => s.push)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<FuelRecord | null>(null)
  const [deletingRecord, setDeletingRecord] = useState<FuelRecord | null>(null)

  const consumption = computeConsumption(records)
  const kmPerLitreByRecordId = new Map(consumption.map((e) => [e.record.id, e.kmPerLitre]))
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date))

  function openCreate() {
    setEditingRecord(null)
    setModalOpen(true)
  }

  function openEdit(record: FuelRecord) {
    setEditingRecord(record)
    setModalOpen(true)
  }

  function handleSubmit(values: FuelFormValues) {
    if (!userId) return
    setModalOpen(false)
    if (editingRecord) {
      updateFuelRecord(editingRecord.id, values)
        .then(() => pushToast('Fuel record updated'))
        .catch((error) =>
          pushToast(error instanceof Error ? error.message : 'Failed to save fuel record', 'error'),
        )
    } else {
      createFuelRecord(userId, vehicle.id, values)
        .then(() => {
          pushToast('Fuel record added')
          return bumpVehicleMileage(vehicle.id, vehicle.mileage, values.mileage)
        })
        .catch((error) =>
          pushToast(error instanceof Error ? error.message : 'Failed to save fuel record', 'error'),
        )
    }
  }

  function handleDelete() {
    if (!deletingRecord) return
    const record = deletingRecord
    setDeletingRecord(null)
    deleteFuelRecord(record.id)
      .then(() => pushToast('Fuel record removed'))
      .catch((error) =>
        pushToast(error instanceof Error ? error.message : 'Failed to remove record', 'error'),
      )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-mist-50">Fuel tracker</h2>
        <Button size="sm" onClick={openCreate}>
          <Plus size={16} /> Add fuel record
        </Button>
      </div>

      {records.length > 0 && <ConsumptionStats records={records} />}

      {isLoading ? (
        <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
      ) : sorted.length === 0 ? (
        <EmptyState
          icon={<FuelIcon size={28} />}
          title="No fuel records yet"
          description="Log a refill to start tracking consumption and fuel spending for this vehicle."
          action={<Button onClick={openCreate}>Add fuel record</Button>}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((record) => {
            const kmPerLitre = kmPerLitreByRecordId.get(record.id)
            return (
              <Card key={record.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-mist-50">{record.petrolType}</p>
                    {record.petrolStation && <Badge tone="steel">{record.petrolStation}</Badge>}
                    {kmPerLitre !== null && kmPerLitre !== undefined && (
                      <Badge tone="blush">{kmPerLitre.toFixed(1)} km/L</Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-mist-500">
                    {formatDate(record.date)} · {formatMileage(record.mileage)} · {record.litres.toFixed(1)} L
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-mist-50">
                    {formatCurrency(record.totalPrice)}
                  </span>
                  <button
                    onClick={() => openEdit(record)}
                    className="rounded-full p-1.5 text-mist-500 hover:bg-white/10 hover:text-mist-100"
                    aria-label="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeletingRecord(record)}
                    className="rounded-full p-1.5 text-mist-500 hover:bg-red-500/10 hover:text-red-400"
                    aria-label="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingRecord ? 'Edit fuel record' : 'Add fuel record'}
      >
        <FuelForm
          defaultValues={editingRecord ?? undefined}
          submitLabel={editingRecord ? 'Save changes' : 'Add record'}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deletingRecord)}
        title="Remove this fuel record?"
        description="This will permanently delete the record."
        confirmLabel="Delete record"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeletingRecord(null)}
      />
    </div>
  )
}
