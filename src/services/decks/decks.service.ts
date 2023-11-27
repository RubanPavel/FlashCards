import { baseApi } from './base-api'
import { CreateDeckType, Deck, DecksResponse } from './decks.types'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckType>({
        invalidatesTags: ['Decks'],
        query: body => ({
          body,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      getDecks: builder.query<DecksResponse, void>({
        providesTags: ['Decks'],
        query: () => `v1/decks`,
      }),
    }
  },
})

export const { useCreateDeckMutation, useGetDecksQuery } = DecksService
