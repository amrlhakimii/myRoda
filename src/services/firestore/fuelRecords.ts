import type { FuelRecord, FuelRecordInput } from '@/types/fuel'
import {
  addDocument,
  removeDocument,
  subscribeWhere,
  subscribeWhereAll,
  updateDocument,
} from './firestoreHelpers'

const COLLECTION = 'fuelRecords'

export function subscribeToFuelRecords(
  userId: string,
  vehicleId: string,
  callback: (records: FuelRecord[]) => void,
  onError?: (error: Error) => void,
) {
  return subscribeWhereAll<FuelRecord>(
    COLLECTION,
    [
      ['userId', userId],
      ['vehicleId', vehicleId],
    ],
    callback,
    onError,
  )
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
