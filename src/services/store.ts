import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { baseApi } from '@/services/base-api'
import { cardsReducer } from '@/services/cards/cards.slice'
import { decksReducer } from '@/services/decks/decks.slice'
import { configureStore } from '@reduxjs/toolkit/'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authReducer } from '@/services/auth/auth.slice'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    authParams: authReducer,
    cardsParams: cardsReducer,
    decksParams: decksReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
setupListeners(store.dispatch)
