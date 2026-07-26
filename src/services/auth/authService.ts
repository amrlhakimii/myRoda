import { GoogleAuthProvider, signInWithPopup, signOut, type AuthError } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '@/services/firebase/config'

const FRIENDLY_MESSAGES: Record<string, string> = {
  'auth/popup-closed-by-user': 'Sign-in was cancelled.',
  'auth/popup-blocked': 'Your browser blocked the sign-in popup. Allow popups and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/operation-not-allowed': 'Google sign-in is not enabled for this Firebase project yet.',
  'auth/unauthorized-domain':
    'This domain is not authorized for sign-in. Add it under Firebase Authentication → Settings → Authorized domains.',
}

export class AuthServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthServiceError'
  }
}

function assertConfigured() {
  if (!isFirebaseConfigured) {
    throw new AuthServiceError(
      'Firebase is not configured yet. Add your project keys to .env to enable sign in.',
    )
  }
}

function toFriendlyError(error: unknown): AuthServiceError {
  const code = (error as AuthError)?.code
  return new AuthServiceError(
    (code && FRIENDLY_MESSAGES[code]) || 'Something went wrong. Please try again.',
  )
}

export async function loginWithGoogle() {
  assertConfigured()
  try {
    const credential = await signInWithPopup(auth, new GoogleAuthProvider())
    const userRef = doc(db, 'users', credential.user.uid)
    const existing = await getDoc(userRef)
    if (!existing.exists()) {
      await setDoc(userRef, {
        uid: credential.user.uid,
        email: credential.user.email,
        createdAt: new Date().toISOString(),
      })
    }
    return credential.user
  } catch (error) {
    throw toFriendlyError(error)
  }
}

export async function logout() {
  assertConfigured()
  await signOut(auth)
}
