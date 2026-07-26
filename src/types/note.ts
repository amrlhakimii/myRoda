export interface MaintenanceNote {
  id: string
  vehicleId: string
  userId: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export type MaintenanceNoteInput = Omit<
  MaintenanceNote,
  'id' | 'vehicleId' | 'userId' | 'createdAt' | 'updatedAt'
>
