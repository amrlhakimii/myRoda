import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})
export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
export type RegisterFormValues = z.infer<typeof registerSchema>

export const resetPasswordSchema = z.object({
  email: z.string().email('Enter a valid email'),
})
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
