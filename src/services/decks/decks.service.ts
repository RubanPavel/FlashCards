import { baseApi } from '@/services/base-api'

import {
  CardResponse,
  CardsResponse,
  CreateDeckRequest,
  Deck,
  DecksResponse,
  DeleteResponse,
  GetDecks,
  GetDecksCardsParams,
  UpdateDeckRequest,
  getRandomCard,
  getRandomCardResponse,
  saveGrade,
  saveGradeResponse,
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

      createDeck: builder.mutation<Deck, CreateDeckRequest>({
        invalidatesTags: ['Decks'],
        query: args => {
          const payload = new FormData()
          const isDeckPrivate = args.isPrivate ? 'true' : 'false'

          args.cover && payload.append('cover', args.cover)
          payload.append('name', args.name)
          payload.append('isPrivate', isDeckPrivate)

          return {
            body: payload,
            formData: true,
            method: 'POST',
            url: `v1/decks`,
          }
        },
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
      getDecks: builder.query<DecksResponse, GetDecks>({
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

      getRandomCard: builder.query<getRandomCardResponse, getRandomCard>({
        providesTags: ['Decks'],
        query: ({ id, ...args }) => ({
          method: 'GET',
          params: {
            ...args,
          },
          url: `/v1/decks/${id}/learn`,
        }),
      }),
      saveGrade: builder.mutation<saveGradeResponse, saveGrade>({
        // invalidatesTags: ['Decks'],
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
        query: ({ id, ...args }) => {
          const payload = new FormData()
          const isDeckPrivate = args.isPrivate ? 'true' : 'false'

          args.cover && payload.append('cover', args.cover)
          payload.append('name', args.name)
          payload.append('isPrivate', isDeckPrivate)

          return {
            body: payload,
            formData: true,
            method: 'PATCH',
            url: `/v1/decks/${id}`,
          }
        },
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
  useUpdateDeckMutation,
} = DecksService
