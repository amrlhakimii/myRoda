import { subscribeToNotes } from '@/services/firestore/notes'
import type { MaintenanceNote } from '@/types/note'
import { useFirestoreQuery } from './useFirestoreQuery'

export function useNotes(vehicleId?: string) {
  return useFirestoreQuery<MaintenanceNote>(
    ['notes', 'vehicle', vehicleId],
    vehicleId ? (cb, onError) => subscribeToNotes(vehicleId, cb, onError) : null,
  )
}
