import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { FirebaseSetupBanner } from '@/components/common/FirebaseSetupBanner'
import { loginSchema, type LoginFormValues } from '@/lib/validation/auth'
import { loginWithEmail } from '@/services/auth/authService'
import { isFirebaseConfigured } from '@/services/firebase/config'
import { useToastStore } from '@/store/toastStore'

export function LoginPage() {
  const navigate = useNavigate()
  const pushToast = useToastStore((s) => s.push)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(values: LoginFormValues) {
    setSubmitError(null)
    try {
      await loginWithEmail(values.email, values.password)
      pushToast('Welcome back!')
      navigate('/dashboard')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to sign in')
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to keep tracking your vehicles.">
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
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex justify-end">
          <Link to="/reset-password" className="text-sm font-medium text-steel-600 hover:text-steel-700">
            Forgot password?
          </Link>
        </div>
        {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-navy-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-steel-600 hover:text-steel-700">
          Create one
        </Link>
      </p>
    </AuthLayout>
  )
}
