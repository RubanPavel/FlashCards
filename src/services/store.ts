import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { decksReducer } from '@/services/decks/decks.slice'
import { configureStore } from '@reduxjs/toolkit'
import {baseApi} from "@/services/base-api";

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(baseApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    decksParams: decksReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
