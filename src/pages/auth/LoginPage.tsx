import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/common/Button'
import { FirebaseSetupBanner } from '@/components/common/FirebaseSetupBanner'
import { loginWithGoogle } from '@/services/auth/authService'
import { isFirebaseConfigured } from '@/services/firebase/config'
import { useToastStore } from '@/store/toastStore'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.9 19 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 15.6 3 8.3 7.7 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 45c5.4 0 10.3-2.1 14-5.5l-6.5-5.4C29.5 35.8 26.9 37 24 37c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C8.2 40.2 15.5 45 24 45z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.5 5.4C41.6 35.8 45 30.4 45 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const pushToast = useToastStore((s) => s.push)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGoogleSignIn() {
    setError(null)
    setIsSubmitting(true)
    try {
      await loginWithGoogle()
      pushToast('Welcome to myRoda!')
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome to myRoda"
      subtitle="Sign in with Google to track every service, fuel, and journey."
    >
      {!isFirebaseConfigured && (
        <div className="mb-5">
          <FirebaseSetupBanner />
        </div>
      )}
      <Button
        fullWidth
        variant="secondary"
        size="lg"
        onClick={handleGoogleSignIn}
        disabled={isSubmitting}
      >
        <GoogleIcon /> {isSubmitting ? 'Signing in…' : 'Continue with Google'}
      </Button>
      {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
      <p className="mt-8 text-center text-xs text-mist-500">
        By continuing, you agree to let myRoda store your vehicle records under your Google
        account.
      </p>
    </AuthLayout>
  )
}
