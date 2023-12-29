export type AuthResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type UpdateUser =
  | { avatar: File; email?: string; name?: string }
  | { avatar?: File; email: string; name?: string }
  | { avatar?: File; email?: string; name: string }

export type updateUserResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type Login = {
  email: string
  password: string
  rememberMe: boolean
}
export type LoginResponse = {
  accessToken: string
}

export type CreateNewUser = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}

export type CreateNewUserResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type verifyEmailType = {
  code: string
}

export type verifyEmailResendType = {
  html: string
  subject: string
  userId: string
}

export type ResetPassword = {
  password: string
  token: string
}
export type RecoveryPassword = {
  email: string
  html: string
  subject: string
}
