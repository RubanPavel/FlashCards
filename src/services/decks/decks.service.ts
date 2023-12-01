import {
  CardResponse,
  CreateCardType,
  CreateDeckType,
  Deck,
  DecksResponse,
  DeleteResponse,
  GetDecksCardsParams,
  UpdateDeckRequest,
  getRandomCardResponse,
  getRandomCardType,
  saveGradeType,
} from './decks.types'
import { decksApi } from './decks-api'

export const DecksService = decksApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<CardResponse, CreateCardType>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...rest }) => ({
          method: 'POST',
          params: {
            ...rest,
          },
          url: `/v1/decks/${id}/cards`,
        }),
      }),

      createDeck: builder.mutation<Deck, CreateDeckType>({
        invalidatesTags: ['Decks'],
        query: body => ({
          body,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deleteDesk: builder.mutation<DeleteResponse, string>({
        invalidatesTags: ['Decks'],
        query: id => ({ method: 'DELETE', url: `v1/decks/${id}` }),
      }),
      getDeckById: builder.query<Deck, string>({
        providesTags: ['Decks'],
        query: id => ({
          id,
          method: 'GET',
          url: `v1/decks/${id}`,
        }),
      }),
      getDecks: builder.query<DecksResponse, void>({
        providesTags: ['Decks'],
        query: () => `v1/decks`,

      }),
      getFilteredData: builder.query<DecksResponse, { name: string }>({
        providesTags: ['Decks'],
        query: arg => ({
          url: 'v1/decks',
          params: arg,
        }),
      }),
      // getDecks: builder.query<DecksResponse, { name?: string }>({
      //   providesTags: ['Decks'],
      //   query: args => ({
      //     url: 'v1/decks',
      //     params: { ...filterParams, ...args },
      //   }),
      // }),

      getDecksCards: builder.query<DecksResponse, GetDecksCardsParams>({
        providesTags: ['Decks'],
        query: ({ id, ...rest }) => ({
          method: 'GET',
          params: {
            ...rest,
          },
          url: `/v1/decks/${id}/cards`,
        }),
      }),

      getRandomCard: builder.query<getRandomCardResponse, getRandomCardType>({
        providesTags: ['Decks'],
        query: ({ id, ...rest }) => ({
          method: 'GET',
          params: {
            ...rest,
          },
          url: `/v1/decks/${id}/learn`,
        }),
      }),
      saveGrade: builder.mutation<{}, saveGradeType>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...rest }) => ({
          method: 'POST',
          params: {
            ...rest,
          },
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

export const { useCreateDeckMutation, useDeleteDeskMutation, useGetDecksQuery, useGetFilteredDataQuery } = DecksService
