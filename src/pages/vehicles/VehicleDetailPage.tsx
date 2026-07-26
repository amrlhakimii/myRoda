import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, Car, Bike, FileDown } from 'lucide-react'
import { clsx } from 'clsx'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { ComingSoon } from '@/components/common/ComingSoon'
import { VehicleForm } from '@/components/forms/VehicleForm'
import { OverviewTab } from '@/components/vehicle/OverviewTab'
import { ServiceTab } from '@/components/vehicle/ServiceTab'
import { FuelTab } from '@/components/vehicle/FuelTab'
import { RemindersTab } from '@/components/vehicle/RemindersTab'
import { NotesTab } from '@/components/vehicle/NotesTab'
import { useVehicles } from '@/hooks/useVehicles'
import { updateVehicle, deleteVehicleCascade } from '@/services/firestore/vehicles'
import { useToastStore } from '@/store/toastStore'
import { VEHICLE_TYPE_LABELS } from '@/utils/constants'
import type { VehicleFormValues } from '@/lib/validation/vehicle'

const TABS = ['overview', 'service', 'fuel', 'reminders', 'notes'] as const
type Tab = (typeof TABS)[number]

const TAB_LABELS: Record<Tab, string> = {
  overview: 'Overview',
  service: 'Service History',
  fuel: 'Fuel',
  reminders: 'Reminders',
  notes: 'Notes',
}

export function VehicleDetailPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>()
  const navigate = useNavigate()
  const pushToast = useToastStore((s) => s.push)
  const { data: vehicles, isLoading } = useVehicles()
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const vehicle = vehicles.find((v) => v.id === vehicleId)

  if (!isLoading && !vehicle) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-navy-600">Vehicle not found.</p>
        <Link to="/vehicles">
          <Button variant="secondary">Back to vehicles</Button>
        </Link>
      </div>
    )
  }

  if (!vehicle) {
    return <div className="h-40 animate-pulse rounded-2xl bg-mist-200" />
  }

  const Icon = vehicle.vehicleType === 'car' ? Car : Bike

  async function handleUpdate(values: VehicleFormValues) {
    if (!vehicle) return
    try {
      await updateVehicle(vehicle.id, { ...values, nickname: values.nickname || undefined })
      pushToast('Vehicle updated')
      setEditOpen(false)
    } catch (error) {
      pushToast(error instanceof Error ? error.message : 'Failed to update vehicle', 'error')
    }
  }

  async function handleDelete() {
    if (!vehicle) return
    setIsDeleting(true)
    try {
      await deleteVehicleCascade(vehicle.id)
      pushToast('Vehicle removed')
      navigate('/vehicles')
    } catch (error) {
      pushToast(error instanceof Error ? error.message : 'Failed to remove vehicle', 'error')
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          to="/vehicles"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-700"
        >
          <ArrowLeft size={15} /> All vehicles
        </Link>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-700 text-white">
              <Icon size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-navy-900">
                {vehicle.nickname || `${vehicle.brand} ${vehicle.model}`}
              </h1>
              <p className="text-sm text-navy-500">
                {VEHICLE_TYPE_LABELS[vehicle.vehicleType]} · {vehicle.registrationNumber}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setExportOpen(true)}>
              <FileDown size={15} /> Export PDF
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setEditOpen(true)}>
              <Pencil size={15} /> Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => setDeleteOpen(true)}>
              <Trash2 size={15} /> Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="scrollbar-none flex gap-1 overflow-x-auto border-b border-mist-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'shrink-0 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors',
              activeTab === tab
                ? 'border-navy-700 text-navy-800'
                : 'border-transparent text-navy-400 hover:text-navy-600',
            )}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'overview' && <OverviewTab vehicle={vehicle} />}
        {activeTab === 'service' && <ServiceTab vehicle={vehicle} />}
        {activeTab === 'fuel' && <FuelTab vehicle={vehicle} />}
        {activeTab === 'reminders' && <RemindersTab vehicle={vehicle} />}
        {activeTab === 'notes' && <NotesTab vehicle={vehicle} />}
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit vehicle">
        <VehicleForm
          defaultValues={vehicle}
          submitLabel="Save changes"
          onSubmit={handleUpdate}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>

      <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Export PDF report" size="sm">
        <ComingSoon
          title="PDF reports are on the way"
          description="Soon you'll be able to export this vehicle's full service and expense history as a shareable PDF."
        />
      </Modal>

      <ConfirmDialog
        open={deleteOpen}
        title="Remove this vehicle?"
        description="This permanently deletes the vehicle along with all of its service, fuel, reminder, and note history."
        confirmLabel="Delete vehicle"
        danger
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  )
}
