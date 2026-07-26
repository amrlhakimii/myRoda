import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { FirebaseSetupBanner } from '@/components/common/FirebaseSetupBanner'
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/lib/validation/auth'
import { resetPassword } from '@/services/auth/authService'
import { isFirebaseConfigured } from '@/services/firebase/config'

export function ResetPasswordPage() {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({ resolver: zodResolver(resetPasswordSchema) })

  async function onSubmit(values: ResetPasswordFormValues) {
    setSubmitError(null)
    try {
      await resetPassword(values.email)
      setSent(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to send reset email')
    }
  }

  return (
    <AuthLayout title="Reset your password" subtitle="We'll email you a link to set a new one.">
      {!isFirebaseConfigured && (
        <div className="mb-5">
          <FirebaseSetupBanner />
        </div>
      )}
      {sent ? (
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <CheckCircle2 className="text-emerald-600" size={22} />
          <p className="text-sm text-emerald-800">
            Check your inbox for a link to reset your password.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          {submitError && <p className="text-sm text-red-600">{submitError}</p>}
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-navy-500">
        Remembered it?{' '}
        <Link to="/login" className="font-semibold text-steel-600 hover:text-steel-700">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
