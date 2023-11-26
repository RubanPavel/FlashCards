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

//Todo
// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
//
// export const avatarSchema = z
//     .any()
//     .refine((files) => {
//         return files?.[0]?.size <= MAX_FILE_SIZE;
//     }, `Max image size is 5MB.`)
//     .refine(
//         (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
//         "Only .jpg, .jpeg, .png and .webp formats are supported."
//     )

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const avatarSchema =  z
        .instanceof(FileList)
           // .refine((file) => {console.log(file)})
//         // .refine((file) => {console.log(file?.size)})
//         // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
//         .refine(
//             (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
//             "Only .jpg, .jpeg, .png and .webp formats are supported."
//         )

// export const avatarSchema =  z
//     .custom<File>()
//     .transform((file) => {console.log(file)})
//     .refine((file) => {console.log(file)})
//     // .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
//     //     message: "The profile picture must be a maximum of 10MB.",
//     // })
//     // .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
//     //     message: "Only images are allowed to be sent.",
//     // })
