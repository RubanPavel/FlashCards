import { GetDecks, SortDirection } from '@/services/decks/decks.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: GetDecks = {
  authorId: undefined,
  currentPage: 1,
  itemsPerPage: 10,
  maxCardsCount: '0',
  minCardsCount: '0',
  name: '',
  orderBy: 'updated-desc',
}

const slice = createSlice({
  initialState,
  name: 'decksParams',
  reducers: {
    setAuthorId: (state, action: PayloadAction<{ authorId: string | undefined }>) => {
      state.authorId = action.payload.authorId
    },
    setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage
    },
    setItemsPerPage: (state, action: PayloadAction<{ itemsPerPage: number }>) => {
      state.itemsPerPage = action.payload.itemsPerPage
    },
    setMaxCardsCount: (state, action: PayloadAction<{ maxCardsCount: string }>) => {
      state.maxCardsCount = action.payload.maxCardsCount
    },
    setMinCardsCount: (state, action: PayloadAction<{ minCardsCount: string }>) => {
      state.minCardsCount = action.payload.minCardsCount
    },
    setName: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name
    },
    setOrderBy: (state, action: PayloadAction<{ orderBy: SortDirection }>) => {
      state.orderBy = action.payload.orderBy
    },
  },
})

export const decksReducer = slice.reducer
export const decksActions = slice.actions
