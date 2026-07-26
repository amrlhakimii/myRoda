import type { FuelRecord, FuelRecordInput } from '@/types/fuel'
import { addDocument, removeDocument, subscribeWhere, updateDocument } from './firestoreHelpers'

const COLLECTION = 'fuelRecords'

export function subscribeToFuelRecords(
  vehicleId: string,
  callback: (records: FuelRecord[]) => void,
  onError?: (error: Error) => void,
) {
  return subscribeWhere<FuelRecord>(COLLECTION, 'vehicleId', vehicleId, callback, onError)
}

export function subscribeToFuelRecordsByUser(
  userId: string,
  callback: (records: FuelRecord[]) => void,
  onError?: (error: Error) => void,
) {
  return subscribeWhere<FuelRecord>(COLLECTION, 'userId', userId, callback, onError)
}

export function createFuelRecord(userId: string, vehicleId: string, input: FuelRecordInput) {
  return addDocument(COLLECTION, {
    ...input,
    userId,
    vehicleId,
    createdAt: new Date().toISOString(),
  })
}

export function updateFuelRecord(recordId: string, input: Partial<FuelRecordInput>) {
  return updateDocument(COLLECTION, recordId, { ...input })
}

export function deleteFuelRecord(recordId: string) {
  return removeDocument(COLLECTION, recordId)
}
