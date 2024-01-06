import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authReducer } from '@/services/auth/auth.slice'
import { baseApi } from '@/services/base-api'
import { cardsReducer } from '@/services/cards/cards.slice'
import { decksReducer } from '@/services/decks/decks.slice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { configureStore } from '@reduxjs/toolkit/react'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    authParams: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    cardsParams: cardsReducer,
    decksParams: decksReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
setupListeners(store.dispatch)
