import { create } from 'zustand'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '@/services/firebase/config'

interface AuthState {
  user: User | null
  isInitialized: boolean
}

export const useAuthStore = create<AuthState>(() => ({
  user: null,
  isInitialized: false,
}))

let started = false

export function initAuthListener() {
  if (started) return
  started = true

  if (!isFirebaseConfigured) {
    useAuthStore.setState({ isInitialized: true })
    return
  }

  onAuthStateChanged(auth, (user) => {
    useAuthStore.setState({ user, isInitialized: true })
  })
}
