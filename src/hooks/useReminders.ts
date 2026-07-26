import {
  subscribeToReminders,
  subscribeToRemindersByUser,
} from '@/services/firestore/reminders'
import { useAuthStore } from '@/store/authStore'
import type { Reminder } from '@/types/reminder'
import { useFirestoreQuery } from './useFirestoreQuery'

export function useReminders(vehicleId?: string) {
  return useFirestoreQuery<Reminder>(
    ['reminders', 'vehicle', vehicleId],
    vehicleId ? (cb, onError) => subscribeToReminders(vehicleId, cb, onError) : null,
  )
}

export function useRemindersByUser() {
  const userId = useAuthStore((s) => s.user?.uid)
  return useFirestoreQuery<Reminder>(
    ['reminders', 'user', userId],
    userId ? (cb, onError) => subscribeToRemindersByUser(userId, cb, onError) : null,
  )
}
