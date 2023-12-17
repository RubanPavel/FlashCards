// import { decksApi } from './decks-api'
import { baseApi } from '@/services/base-api'

import {
  CardResponse,
  CardsResponse,
  Deck,
  DecksResponse,
  DeleteResponse,
  GetDecksCardsParams,
  GetDecksType,
  UpdateDeckRequest,
  getRandomCardResponse,
  getRandomCardType,
  saveGradeType,
} from './decks.types'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<CardResponse, FormData>({
        invalidatesTags: ['Decks'],
        query: args => {
          const id = args.get('id')

          args.delete('id')

          return {
            body: args,
            method: 'POST',
            url: `/v1/decks/${id}/cards`,
          }
        },
      }),

      createDeck: builder.mutation<Deck, FormData>({
        invalidatesTags: ['Decks'],
        query: formData => ({
          body: formData,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deleteDesk: builder.mutation<DeleteResponse, string>({
        invalidatesTags: ['Decks'],
        query: id => ({ method: 'DELETE', url: `v1/decks/${id}` }),
      }),

      getDeckById: builder.query<Deck, { id?: string }>({
        providesTags: ['Decks'],
        query: ({ id }) => ({
          id,
          method: 'GET',
          url: `v1/decks/${id}`,
        }),
      }),
      getDecks: builder.query<DecksResponse, GetDecksType | any>({
        providesTags: ['Decks'],
        query: args => ({
          params: args,
          url: `v1/decks`,
        }),
      }),
      getDecksCards: builder.query<CardsResponse, GetDecksCardsParams>({
        providesTags: ['Decks'],
        query: ({ id, ...args }) => ({
          method: 'GET',
          params: {
            ...args,
          },
          url: `/v1/decks/${id}/cards`,
        }),
      }),

      getRandomCard: builder.query<getRandomCardResponse, getRandomCardType>({
        providesTags: ['Decks'],
        query: ({ id, ...args }) => ({
          method: 'GET',
          params: {
            ...args,
          },
          url: `/v1/decks/${id}/learn`,
        }),
      }),
      saveGrade: builder.mutation<{}, saveGradeType>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...args }) => ({
          body: {
            ...args,
          },
          method: 'POST',
          url: `/v1/decks/${id}/learn`,
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckRequest>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => ({ method: 'PATCH', url: `v1/decks/${id}` }),
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteDeskMutation,
  useGetDeckByIdQuery,
  useGetDecksCardsQuery,
  useGetDecksQuery,
  useGetRandomCardQuery,
  useSaveGradeMutation,
} = DecksService
