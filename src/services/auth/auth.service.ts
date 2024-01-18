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
  UpdateUserResponse,
  VerifyEmail,
  VerifyEmailResend,
} from './auth.types'

export const AuthService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createNewUser: builder.mutation<CreateNewUserResponse, CreateNewUser>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `/v1/auth/sign-up`,
        }),
      }),
      getAuthMe: builder.query<AuthResponse | null, void>({
        providesTags: ['Auth'],
        query: () => ({
          method: 'GET',
          url: `v1/auth/me`,
        }),
      }),

      login: builder.mutation<LoginResponse, Login>({
        invalidatesTags: (data, error) => (data && !error ? ['Auth'] : []),
        query: args => ({
          body: args,
          method: 'POST',
          url: `/v1/auth/login`,
        }),
      }),
      logout: builder.mutation<void, void>({
        // invalidatesTags: ['Auth'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(AuthService.util.updateQueryData('getAuthMe', _, () => null))

          try {
            await queryFulfilled
            dispatch(baseApi.util?.resetApiState())
          } catch {
            patchResult.undo()
          }
        },
        query: () => ({
          method: 'POST',
          url: `/v1/auth/logout`,
        }),
      }),
      recoveryPassword: builder.mutation<void, RecoveryPassword>({
        query: ({ ...args }) => ({
          body: {
            ...args,
          },
          method: 'POST',
          url: `/v1/auth/recover-password`,
        }),
      }),
      resetPassword: builder.mutation<void, ResetPassword>({
        query: ({ token, ...args }) => ({
          body: {
            ...args,
          },
          method: 'POST',
          url: `/v1/auth/reset-password/${token}`,
        }),
      }),
      updateUser: builder.mutation<UpdateUserResponse, UpdateUser>({
        invalidatesTags: ['Auth'],
        query: args => {
          const payload = new FormData()

          if ('avatar' in args && args.avatar) {
            payload.append('avatar', args.avatar)
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
      verifyEmail: builder.mutation<void, VerifyEmail>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `/v1/auth/verify-email`,
        }),
      }),
      verifyEmailResend: builder.mutation<void, VerifyEmailResend>({
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
