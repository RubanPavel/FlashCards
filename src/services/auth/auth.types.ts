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

export type loginType = {
  email: string
  password: string
  rememberMe: boolean
}
export type loginResponse = {
  accessToken: string
}

export type createNewUserType = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}

export type createNewUserResponse = {
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

export type resetPasswordType = {
  password: string
  token: string
}
export type recoveryPasswordType = {
  email: string
  html: string
  subject: string
}
