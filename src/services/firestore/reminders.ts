import type { Reminder, ReminderInput } from '@/types/reminder'
import { addDocument, removeDocument, subscribeWhere, updateDocument } from './firestoreHelpers'

const COLLECTION = 'reminders'

export function subscribeToReminders(
  vehicleId: string,
  callback: (reminders: Reminder[]) => void,
  onError?: (error: Error) => void,
) {
  return subscribeWhere<Reminder>(COLLECTION, 'vehicleId', vehicleId, callback, onError)
}

export function subscribeToRemindersByUser(
  userId: string,
  callback: (reminders: Reminder[]) => void,
  onError?: (error: Error) => void,
) {
  return subscribeWhere<Reminder>(COLLECTION, 'userId', userId, callback, onError)
}

export function createReminder(
  userId: string,
  vehicleId: string,
  input: ReminderInput,
  nextDueDate: string,
) {
  return addDocument(COLLECTION, {
    ...input,
    userId,
    vehicleId,
    nextDueDate,
    createdAt: new Date().toISOString(),
  })
}

export function updateReminder(reminderId: string, input: Partial<ReminderInput & { nextDueDate: string }>) {
  return updateDocument(COLLECTION, reminderId, { ...input })
}

export function deleteReminder(reminderId: string) {
  return removeDocument(COLLECTION, reminderId)
}
