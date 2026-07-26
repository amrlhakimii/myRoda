import { collection, doc, getDocs, query, where, writeBatch } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import type { Vehicle, VehicleInput } from '@/types/vehicle'
import { addDocument, removeDocument, subscribeWhere, updateDocument } from './firestoreHelpers'

const CASCADE_COLLECTIONS = ['serviceRecords', 'fuelRecords', 'reminders', 'notes']

const COLLECTION = 'vehicles'

export function subscribeToVehicles(
  userId: string,
  callback: (vehicles: Vehicle[]) => void,
  onError?: (error: Error) => void,
) {
  return subscribeWhere<Vehicle>(COLLECTION, 'userId', userId, callback, onError)
}

export function createVehicle(userId: string, input: VehicleInput) {
  const now = new Date().toISOString()
  return addDocument(COLLECTION, { ...input, userId, createdAt: now, updatedAt: now })
}

export function updateVehicle(vehicleId: string, input: Partial<VehicleInput>) {
  return updateDocument(COLLECTION, vehicleId, { ...input, updatedAt: new Date().toISOString() })
}

export function deleteVehicle(vehicleId: string) {
  return removeDocument(COLLECTION, vehicleId)
}

/** Raises the vehicle's stored mileage when a new record reports a higher reading. */
export function bumpVehicleMileage(vehicleId: string, currentMileage: number, candidateMileage: number) {
  if (candidateMileage > currentMileage) {
    return updateVehicle(vehicleId, { mileage: candidateMileage })
  }
  return Promise.resolve()
}

/** Deletes the vehicle along with every service, fuel, reminder, and note record tied to it. */
export async function deleteVehicleCascade(vehicleId: string) {
  const batch = writeBatch(db)
  for (const collectionName of CASCADE_COLLECTIONS) {
    const snapshot = await getDocs(query(collection(db, collectionName), where('vehicleId', '==', vehicleId)))
    snapshot.forEach((docSnap) => batch.delete(docSnap.ref))
  }
  batch.delete(doc(db, COLLECTION, vehicleId))
  await batch.commit()
}
