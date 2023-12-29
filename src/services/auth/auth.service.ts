import { baseApi } from '@/services/base-api'

import {
  AuthResponse,
  CreateNewUser,
  CreateNewUserResponse,
  Login,
  LoginResponse,
  RecoveryPassword,
  ResetPassword,
  UpdateUser,
  updateUserResponse,
  verifyEmailResendType,
  verifyEmailType,
} from './auth.types'

export const AuthService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createNewUser: builder.mutation<CreateNewUserResponse, CreateNewUser>({
        invalidatesTags: ['Auth'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `/v1/auth/sign-up`,
        }),
      }),
      getAuthMe: builder.query<AuthResponse, void>({
        providesTags: ['Auth'],
        query: () => ({
          method: 'GET',
          url: `v1/auth/me`,
        }),
      }),
      login: builder.mutation<LoginResponse, Login>({
        invalidatesTags: ['Auth'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `/v1/auth/login`,
        }),
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Auth'],
        query: () => ({
          method: 'POST',
          url: `/v1/auth/logout`,
        }),
      }),
      recoveryPassword: builder.mutation<void, RecoveryPassword>({
        invalidatesTags: ['Auth'],
        query: ({ ...args }) => ({
          body: {
            ...args,
          },
          method: 'POST',
          url: `/v1/auth/recover-password`,
        }),
      }),
      resetPassword: builder.mutation<void, ResetPassword>({
        invalidatesTags: ['Auth'],
        query: ({ token, ...args }) => ({
          body: {
            ...args,
          },
          method: 'POST',
          url: `/v1/auth/reset-password/${token}`,
        }),
      }),
      updateUser: builder.mutation<updateUserResponse, UpdateUser>({
        invalidatesTags: ['Auth'],
        query: args => {
          const payload = new FormData()

          if ('avatar' in args && args.avatar) {
            payload.append('avatar', args.avatar)
          }
          if ('email' in args && args.email) {
            payload.append('email', args.email)
          }
          if ('name' in args && args.name) {
            payload.append('name', args.name)
          }

          return {
            body: payload,
            method: 'PATCH',
            url: 'v1/auth/me',
          }
        },
      }),
      verifyEmail: builder.mutation<unknown, verifyEmailType>({
        invalidatesTags: ['Auth'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `/v1/auth/verify-email`,
        }),
      }),
      verifyEmailResend: builder.mutation<void, verifyEmailResendType>({
        invalidatesTags: ['Auth'],
        query: ({ ...args }) => ({
          body: {
            ...args,
          },
          method: 'POST',
          url: `/v1/auth/resend-verification-email`,
        }),
      }),
    }
  },
})

export const {
  useCreateNewUserMutation,
  useGetAuthMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRecoveryPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useVerifyEmailMutation,
} = AuthService
