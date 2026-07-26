import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { FirebaseSetupBanner } from '@/components/common/FirebaseSetupBanner'
import { registerSchema, type RegisterFormValues } from '@/lib/validation/auth'
import { registerWithEmail } from '@/services/auth/authService'
import { isFirebaseConfigured } from '@/services/firebase/config'
import { useToastStore } from '@/store/toastStore'

export function RegisterPage() {
  const navigate = useNavigate()
  const pushToast = useToastStore((s) => s.push)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) })

  async function onSubmit(values: RegisterFormValues) {
    setSubmitError(null)
    try {
      await registerWithEmail(values.email, values.password)
      pushToast('Account created — welcome to myRoda!')
      navigate('/dashboard')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create account')
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Start tracking every service, fuel, and journey.">
      {!isFirebaseConfigured && (
        <div className="mb-5">
          <FirebaseSetupBanner />
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-navy-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-steel-600 hover:text-steel-700">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
