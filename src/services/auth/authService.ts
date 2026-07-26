import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type AuthError,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '@/services/firebase/config'

const FRIENDLY_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/too-many-requests': 'Too many attempts. Try again in a few minutes.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/operation-not-allowed':
    'Email/Password sign-in is not enabled for this Firebase project yet. Enable it in Firebase console → Authentication → Sign-in method.',
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

export async function registerWithEmail(email: string, password: string) {
  assertConfigured()
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, 'users', credential.user.uid), {
      uid: credential.user.uid,
      email: credential.user.email,
      createdAt: new Date().toISOString(),
    })
    return credential.user
  } catch (error) {
    throw toFriendlyError(error)
  }
}

export async function loginWithEmail(email: string, password: string) {
  assertConfigured()
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  } catch (error) {
    throw toFriendlyError(error)
  }
}

export async function logout() {
  assertConfigured()
  await signOut(auth)
}

export async function resetPassword(email: string) {
  assertConfigured()
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw toFriendlyError(error)
  }
}
