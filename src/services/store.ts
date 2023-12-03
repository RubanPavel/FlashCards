import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authApi } from '@/services/auth/auth-api'
import { cardsApi } from '@/services/cards/cards-api'
import { decksApi } from '@/services/decks/decks-api'
import { decksReducer } from '@/services/decks/decks.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(decksApi.middleware)
      .concat(cardsApi.middleware),
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
    [decksApi.reducerPath]: decksApi.reducer,
    decksParams: decksReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
