// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//
// export const decksApi = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.flashcards.andrii.es',
//     credentials: 'include',
//     prepareHeaders: headers => {
//       headers.append('x-auth-skip', 'true')
//     },
//   }),
//   endpoints: () => ({}),
//   reducerPath: 'baseApi',
//   tagTypes: ['Decks'],
// })

import { createFlashcardsApi } from '@/services/base-api'

export const decksApi = createFlashcardsApi(['Decks'], 'decksApi')
