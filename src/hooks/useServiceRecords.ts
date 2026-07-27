import {
  subscribeToServiceRecords,
  subscribeToServiceRecordsByUser,
} from '@/services/firestore/serviceRecords'
import { useAuthStore } from '@/store/authStore'
import type { ServiceRecord } from '@/types/service'
import { useFirestoreQuery } from './useFirestoreQuery'

export function useServiceRecords(vehicleId?: string) {
  const userId = useAuthStore((s) => s.user?.uid)
  return useFirestoreQuery<ServiceRecord>(
    ['serviceRecords', 'vehicle', vehicleId],
    userId && vehicleId
      ? (cb, onError) => subscribeToServiceRecords(userId, vehicleId, cb, onError)
      : null,
  )
}

export function useServiceRecordsByUser() {
  const userId = useAuthStore((s) => s.user?.uid)
  return useFirestoreQuery<ServiceRecord>(
    ['serviceRecords', 'user', userId],
    userId ? (cb, onError) => subscribeToServiceRecordsByUser(userId, cb, onError) : null,
  )
}
