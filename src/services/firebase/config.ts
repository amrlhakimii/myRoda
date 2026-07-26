import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
)

const app =
  getApps()[0] ??
  initializeApp(
    isFirebaseConfigured
      ? firebaseConfig
      : { apiKey: 'demo-key', projectId: 'myroda-demo', appId: '1:0:web:demo' },
  )

export const auth = getAuth(app)

/**
 * Persistent local cache (IndexedDB) means data renders instantly from cache on
 * every load after the first, while onSnapshot syncs the latest in the background
 * — without this, every page load was a cold network round-trip to Firestore.
 */
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentSingleTabManager({}) }),
})
