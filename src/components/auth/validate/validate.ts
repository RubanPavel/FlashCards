import { z } from 'zod'

export const emailSchema = z.string().min(1, 'Email is required').email('Invalid email address')

export const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(3, 'Password must contain at least 3 characters')
  .max(30, 'Password must be at most 30 characters long')

export const confirmPasswordSchema = z.string().min(1, 'Confirm password is required')

export const rememberMe = z.boolean().optional()

export const nicknameSchema = z
  .string()
  .min(3, 'Nickname must contain at least 3 characters')
  .max(30, 'Nickname must be at most 30 characters long')

//TODO поправить ограничения по аватару
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const radioOptions = [
  'Did not know',
  'Forgot',
  'A lot of though',
  'Confused',
  'Knew the answer',
]

export const avatarSchema = z
  .instanceof(FileList)
  .refine(file => file && file?.[0].size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    file => file && ACCEPTED_IMAGE_TYPES.includes(file?.[0].type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  )
  .optional()

export const searchSchema = z.string().optional()

export const namePackSchema = z.string().min(3, 'Name must contain at least 3 characters')
export const questionSchema = z.string().min(3, 'Question must contain at least 3 characters')
export const answerSchema = z.string().min(2, 'Answer must contain at least 2 characters')
export const photoSchema = z
  .instanceof(File)
  .refine(file => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    file => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  )
  .optional()
export const radioSchema = z
  .string()
  .refine(field => radioOptions.includes(field), { message: 'select one of the options' })
