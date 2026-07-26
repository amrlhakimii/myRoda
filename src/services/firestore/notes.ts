import type { MaintenanceNote, MaintenanceNoteInput } from '@/types/note'
import { addDocument, removeDocument, subscribeWhere, updateDocument } from './firestoreHelpers'

const COLLECTION = 'notes'

export function subscribeToNotes(
  vehicleId: string,
  callback: (notes: MaintenanceNote[]) => void,
  onError?: (error: Error) => void,
) {
  return subscribeWhere<MaintenanceNote>(COLLECTION, 'vehicleId', vehicleId, callback, onError)
}

export function createNote(userId: string, vehicleId: string, input: MaintenanceNoteInput) {
  const now = new Date().toISOString()
  return addDocument(COLLECTION, { ...input, userId, vehicleId, createdAt: now, updatedAt: now })
}

export function updateNote(noteId: string, input: Partial<MaintenanceNoteInput>) {
  return updateDocument(COLLECTION, noteId, { ...input, updatedAt: new Date().toISOString() })
}

export function deleteNote(noteId: string) {
  return removeDocument(COLLECTION, noteId)
}
