import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type TagTypes = ['Auth' | 'Cards' | 'Decks']
type ReducerPaths = 'authApi' | 'cardsApi' | 'decksApi'

export const createFlashcardsApi = <TagType extends TagTypes, ReducerPath extends ReducerPaths>(
  tagTypes: TagType,
  reducerPath: ReducerPath
) => {
  return createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://api.flashcards.andrii.es',
      credentials: 'include',
      prepareHeaders: headers => {
        headers.append('x-auth-skip', 'true')
      },
    }),
    endpoints: () => ({}),
    reducerPath,
    tagTypes,
  })
}

// export const baseApi = () => {
//   return createApi({
//     baseQuery: fetchBaseQuery({
//       baseUrl: 'https://api.flashcards.andrii.es',
//       credentials: 'include',
//       prepareHeaders: headers => {
//         headers.append('x-auth-skip', 'true');
//       },
//     }),
//     endpoints: () => ({}),
//     tagTypes: ['Decks', 'Auth', 'Cards'],
//     reducerPath: 'baseApi',
//   });
// };
