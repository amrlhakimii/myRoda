import { subscribeToVehicles } from '@/services/firestore/vehicles'
import { useAuthStore } from '@/store/authStore'
import type { Vehicle } from '@/types/vehicle'
import { useFirestoreQuery } from './useFirestoreQuery'

export function useVehicles() {
  const userId = useAuthStore((s) => s.user?.uid)
  return useFirestoreQuery<Vehicle>(
    ['vehicles', userId],
    userId ? (cb, onError) => subscribeToVehicles(userId, cb, onError) : null,
  )
}
