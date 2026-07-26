import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from 'firebase/firestore'
import { db } from '@/services/firebase/config'

export function makeConverter<T extends { id: string }>(): FirestoreDataConverter<T> {
  return {
    toFirestore: (data) => {
      const rest = { ...data } as Record<string, unknown>
      delete rest.id
      return rest
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
      return { id: snapshot.id, ...snapshot.data(options) } as T
    },
  }
}

export function subscribeWhere<T extends { id: string }>(
  collectionName: string,
  field: string,
  value: string,
  callback: (items: T[]) => void,
  onError?: (error: Error) => void,
) {
  const converter = makeConverter<T>()
  const q = query(collection(db, collectionName).withConverter(converter), where(field, '==', value))
  return onSnapshot(
    q,
    (snapshot) => callback(snapshot.docs.map((d) => d.data())),
    (error) => onError?.(error),
  )
}

export async function addDocument(collectionName: string, data: Record<string, unknown>) {
  const ref = await addDoc(collection(db, collectionName), data)
  return ref.id
}

export async function updateDocument(
  collectionName: string,
  id: string,
  data: Record<string, unknown>,
) {
  await updateDoc(doc(db, collectionName, id), data)
}

export async function removeDocument(collectionName: string, id: string) {
  await deleteDoc(doc(db, collectionName, id))
}
