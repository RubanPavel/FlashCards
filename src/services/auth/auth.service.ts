import { AuthResponse } from './auth.types'
import { authApi } from './auth-api'

export const AuthService = authApi.injectEndpoints({
  endpoints: builder => {
    return {
      getAuthMe: builder.query<AuthResponse, void>({
        providesTags: ['Auth'],
        query: () => ({
          method: 'GET',
          url: `v1/auth/me`,
        }),
      }),
    }
  },
})

export const { useGetAuthMeQuery } = AuthService
