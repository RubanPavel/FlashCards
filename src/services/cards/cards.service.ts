import { CardsResponse, updateCardResponse, updateCardType } from './cards.types'
import { cardsApi } from './cards-api'

export const CardsService = cardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCard: builder.mutation<void, string>({
        invalidatesTags: ['Cards'],
        query: id => ({
          method: 'DELETE',
          url: `/v1/cards/${id}`,
        }),
      }),
      getCardsById: builder.query<CardsResponse, string>({
        providesTags: ['Cards'],
        query: id => ({
          id,
          method: 'GET',
          url: `/v1/cards/${id}`,
        }),
      }),
      updateCard: builder.mutation<updateCardResponse, updateCardType>({
        invalidatesTags: ['Cards'],
        query: ({ id, ...args }) => ({
          body: {
            ...args,
          },
          method: 'PATCH',
          url: `/v1/cards/${id}`,
        }),
      }),
    }
  },
})

export const {} = CardsService
