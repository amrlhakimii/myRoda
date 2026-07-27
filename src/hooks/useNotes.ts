import { subscribeToNotes } from '@/services/firestore/notes'
import { useAuthStore } from '@/store/authStore'
import type { MaintenanceNote } from '@/types/note'
import { useFirestoreQuery } from './useFirestoreQuery'

export function useNotes(vehicleId?: string) {
  const userId = useAuthStore((s) => s.user?.uid)
  return useFirestoreQuery<MaintenanceNote>(
    ['notes', 'vehicle', vehicleId],
    userId && vehicleId ? (cb, onError) => subscribeToNotes(userId, vehicleId, cb, onError) : null,
  )
}
