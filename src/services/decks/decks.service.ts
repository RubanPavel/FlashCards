import { baseApi } from '@/services/base-api'
import { RootState } from '@/services/store'

import {
  CardResponse,
  CreateCardType,
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

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<CardResponse, CreateCardType>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...args }) => ({
          body: {
            ...args,
          },
          method: 'POST',
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      createDeck: builder.mutation<Deck, FormData>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const result = await queryFulfilled
          const state = getState() as RootState
          const decksParams = state.decksParams

          dispatch(
            decksApi.util.updateQueryData('getDecks', { decksParams }, draft => {
              draft.items.unshift(result.data)
            })
          )
        },
        query: formData => ({
          body: formData,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deleteDesk: builder.mutation<DeleteResponse, string>({
        invalidatesTags: ['Decks'],
        onQueryStarted: async (id, { dispatch, getState, queryFulfilled }) => {
          const state = getState() as RootState
          const decksParams = state.decksParams
          const patchResult = dispatch(
            decksApi.util.updateQueryData('getDecks', { decksParams }, draft => {
              const index = draft.items.findIndex(item => item.id === id)

              draft.items.splice(index, 1)
            })
          )

          try {
            await queryFulfilled
          } catch (e) {
            // console.log(JSON.stringify(e))
            patchResult.undo()
          }
        },
        query: id => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getDeckById: builder.query<Deck, string>({
        providesTags: ['Decks'],
        query: id => ({
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
      getDecksCards: builder.query<DecksResponse, GetDecksCardsParams>({
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

export const { useCreateDeckMutation, useDeleteDeskMutation, useGetDecksQuery } = decksApi
