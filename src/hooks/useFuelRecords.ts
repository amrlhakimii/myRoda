import {
  subscribeToFuelRecords,
  subscribeToFuelRecordsByUser,
} from '@/services/firestore/fuelRecords'
import { useAuthStore } from '@/store/authStore'
import type { FuelRecord } from '@/types/fuel'
import { useFirestoreQuery } from './useFirestoreQuery'

export function useFuelRecords(vehicleId?: string) {
  const userId = useAuthStore((s) => s.user?.uid)
  return useFirestoreQuery<FuelRecord>(
    ['fuelRecords', 'vehicle', vehicleId],
    userId && vehicleId
      ? (cb, onError) => subscribeToFuelRecords(userId, vehicleId, cb, onError)
      : null,
  )
}

export function useFuelRecordsByUser() {
  const userId = useAuthStore((s) => s.user?.uid)
  return useFirestoreQuery<FuelRecord>(
    ['fuelRecords', 'user', userId],
    userId ? (cb, onError) => subscribeToFuelRecordsByUser(userId, cb, onError) : null,
  )
}
