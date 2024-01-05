import { baseApi } from '@/services/base-api'

import { CardsResponse, updateCardResponse } from './cards.types'

export const CardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCard: builder.mutation<void, string>({
        invalidatesTags: ['Cards', 'Decks'],
        query: id => ({
          method: 'DELETE',
          url: `/v1/cards/${id}`,
        }),
      }),
      getCardsById: builder.query<CardsResponse, { id: string }>({
        providesTags: ['Cards'],
        query: id => ({
          id,
          method: 'GET',
          url: `/v1/cards/${id}`,
        }),
      }),
      updateCard: builder.mutation<updateCardResponse, FormData>({
        invalidatesTags: ['Cards', 'Decks'],
        query: args => {
          const id = args.get('id')

          args.delete('id')

          return {
            body: args,
            method: 'PATCH',
            url: `/v1/cards/${id}`,
          }
        },
      }),
    }
  },
})

export const { useDeleteCardMutation, useGetCardsByIdQuery, useUpdateCardMutation } = CardsService
