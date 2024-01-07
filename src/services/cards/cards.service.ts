import { baseApi } from '@/services/base-api'

import { CardsResponse, updateCardResponse, updateCardType } from './cards.types'

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
      updateCard: builder.mutation<updateCardResponse, updateCardType>({
        invalidatesTags: ['Cards', 'Decks'],
        query: ({ id, ...args }) => {
          const payload = new FormData()

          args.answerImg && payload.append('answerImg', args.answerImg)
          payload.append('answer', args.answer)

          args.questionImg && payload.append('questionImg', args.questionImg)
          payload.append('question', args.question)

          return {
            body: payload,
            formData: true,
            method: 'PATCH',
            url: `/v1/cards/${id}`,
          }
        },
      }),
    }
  },
})

export const { useDeleteCardMutation, useUpdateCardMutation } = CardsService
