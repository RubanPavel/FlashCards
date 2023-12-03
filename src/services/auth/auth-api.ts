// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//
// export const authApi = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.flashcards.andrii.es',
//     credentials: 'include',
//     prepareHeaders: headers => {
//       headers.append('x-auth-skip', 'true')
//     },
//   }),
//   endpoints: () => ({}),
//   reducerPath: 'baseApi',
//   tagTypes: ['Auth'],
// })

import { createFlashcardsApi } from '@/services/base-api'

export const authApi = createFlashcardsApi(['Auth'], 'authApi')
