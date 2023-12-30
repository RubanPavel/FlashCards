import { createApi } from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from "@/services/base-api-with-reauth";

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_BASE_URL,
  //   credentials: 'include',
  // }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Auth', 'Cards'],
})
