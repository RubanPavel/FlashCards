import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Auth', 'Cards'],
})
