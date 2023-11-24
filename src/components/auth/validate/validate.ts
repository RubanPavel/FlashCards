import { z } from 'zod'

export const emailSchema = z.string().min(1, 'Email is required').email('Invalid email address')

export const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(3, 'Password must contain at least 3 characters')
  .max(30, 'Password must be at most 30 characters long')

export const confirmPasswordSchema = z.string().min(1, 'Confirm password is required')

export const rememberMe = z.boolean().default(false)
