import { useState } from 'react'
import { Plus, Wrench, Pencil, Trash2, MapPin } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { ServiceForm } from '@/components/forms/ServiceForm'
import { useServiceRecords } from '@/hooks/useServiceRecords'
import {
  createServiceRecord,
  deleteServiceRecord,
  updateServiceRecord,
} from '@/services/firestore/serviceRecords'
import { bumpVehicleMileage } from '@/services/firestore/vehicles'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import { formatCurrency, formatDate, formatMileage } from '@/utils/formatters'
import type { Vehicle } from '@/types/vehicle'
import type { ServiceRecord } from '@/types/service'
import type { ServiceFormValues } from '@/lib/validation/service'

export function ServiceTab({ vehicle }: { vehicle: Vehicle }) {
  const userId = useAuthStore((s) => s.user?.uid)
  const { data: records, isLoading } = useServiceRecords(vehicle.id)
  const pushToast = useToastStore((s) => s.push)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<ServiceRecord | null>(null)
  const [deletingRecord, setDeletingRecord] = useState<ServiceRecord | null>(null)

  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date))

  function openCreate() {
    setEditingRecord(null)
    setModalOpen(true)
  }

  function openEdit(record: ServiceRecord) {
    setEditingRecord(record)
    setModalOpen(true)
  }

  function handleSubmit(values: ServiceFormValues) {
    if (!userId) return
    const items = values.items.map((item) => ({ ...item, id: crypto.randomUUID() }))
    const payload = { ...values, items }
    setModalOpen(false)
    if (editingRecord) {
      updateServiceRecord(editingRecord.id, payload)
        .then(() => pushToast('Service record updated'))
        .catch((error) =>
          pushToast(error instanceof Error ? error.message : 'Failed to save service record', 'error'),
        )
    } else {
      createServiceRecord(userId, vehicle.id, payload)
        .then(() => {
          pushToast('Service record added')
          return bumpVehicleMileage(vehicle.id, vehicle.mileage, values.mileage)
        })
        .catch((error) =>
          pushToast(error instanceof Error ? error.message : 'Failed to save service record', 'error'),
        )
    }
  }

  function handleDelete() {
    if (!deletingRecord) return
    const record = deletingRecord
    setDeletingRecord(null)
    deleteServiceRecord(record.id)
      .then(() => pushToast('Service record removed'))
      .catch((error) =>
        pushToast(error instanceof Error ? error.message : 'Failed to remove record', 'error'),
      )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-navy-900">Service history</h2>
        <Button size="sm" onClick={openCreate}>
          <Plus size={16} /> Add service record
        </Button>
      </div>

      {isLoading ? (
        <div className="h-24 animate-pulse rounded-2xl bg-mist-200" />
      ) : sorted.length === 0 ? (
        <EmptyState
          icon={<Wrench size={28} />}
          title="No service records yet"
          description="Log your first workshop visit to start building this vehicle's maintenance history."
          action={<Button onClick={openCreate}>Add service record</Button>}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((record) => (
            <Card key={record.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-navy-900">{record.workshopName}</p>
                    <Badge tone="steel">{formatMileage(record.mileage)}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-navy-500">{formatDate(record.date)}</p>
                  {record.workshopLocation && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-navy-400">
                      <MapPin size={12} /> {record.workshopLocation}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-navy-900">
                    {formatCurrency(record.totalCost)}
                  </span>
                  <button
                    onClick={() => openEdit(record)}
                    className="rounded-full p-1.5 text-navy-400 hover:bg-mist-100 hover:text-navy-700"
                    aria-label="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeletingRecord(record)}
                    className="rounded-full p-1.5 text-navy-400 hover:bg-red-50 hover:text-red-600"
                    aria-label="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              {record.items.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-mist-100 pt-3">
                  {record.items.map((item) => (
                    <Badge key={item.id} tone="neutral">
                      {item.itemName}
                      {item.quantity > 1 ? ` ×${item.quantity}` : ''}
                    </Badge>
                  ))}
                </div>
              )}
              {record.notes && <p className="mt-2 text-sm text-navy-500">{record.notes}</p>}
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingRecord ? 'Edit service record' : 'Add service record'}
        size="lg"
      >
        <ServiceForm
          defaultValues={editingRecord ?? undefined}
          submitLabel={editingRecord ? 'Save changes' : 'Add record'}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deletingRecord)}
        title="Remove this service record?"
        description="This will permanently delete the record and its parts list."
        confirmLabel="Delete record"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeletingRecord(null)}
      />
    </div>
  )
}
