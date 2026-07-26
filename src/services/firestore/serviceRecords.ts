import type { ServiceRecord, ServiceRecordInput } from '@/types/service'
import { addDocument, removeDocument, subscribeWhere, updateDocument } from './firestoreHelpers'

const COLLECTION = 'serviceRecords'

export function subscribeToServiceRecords(
  vehicleId: string,
  callback: (records: ServiceRecord[]) => void,
  onError?: (error: Error) => void,
) {
  return subscribeWhere<ServiceRecord>(COLLECTION, 'vehicleId', vehicleId, callback, onError)
}

export function subscribeToServiceRecordsByUser(
  userId: string,
  callback: (records: ServiceRecord[]) => void,
  onError?: (error: Error) => void,
) {
  return subscribeWhere<ServiceRecord>(COLLECTION, 'userId', userId, callback, onError)
}

export function createServiceRecord(userId: string, vehicleId: string, input: ServiceRecordInput) {
  return addDocument(COLLECTION, {
    ...input,
    userId,
    vehicleId,
    createdAt: new Date().toISOString(),
  })
}

export function updateServiceRecord(recordId: string, input: Partial<ServiceRecordInput>) {
  return updateDocument(COLLECTION, recordId, { ...input })
}

export function deleteServiceRecord(recordId: string) {
  return removeDocument(COLLECTION, recordId)
}
