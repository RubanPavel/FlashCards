// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//
// export const cardsApi = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.flashcards.andrii.es',
//     credentials: 'include',
//     prepareHeaders: headers => {
//       headers.append('x-auth-skip', 'true')
//     },
//   }),
//   endpoints: () => ({}),
//   reducerPath: 'baseApi',
//   tagTypes: ['Cards'],
// })

import { createFlashcardsApi } from '@/services/base-api'

export const cardsApi = createFlashcardsApi(['Cards'], 'cardsApi')
