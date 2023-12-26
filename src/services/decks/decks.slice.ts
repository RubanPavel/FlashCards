import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type orderByUpdated = 'updated-asc' | 'updated-desc'
type InitialState = {
  authorId: string | undefined
  currentPage: number
  itemsPerPage: number
  maxCardsCount: string
  minCardsCount: string
  name: string
  orderBy: orderByUpdated
}

const initialState: InitialState = {
  authorId: undefined,
  currentPage: 1,
  itemsPerPage: 10,
  maxCardsCount: '0',
  minCardsCount: '0',
  name: '',
  //TODO возможно поменять orderBy и протипизировать более узко, возможно строка слишком широко
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
    setOrderBy: (state, action: PayloadAction<{ orderBy: orderByUpdated }>) => {
      state.orderBy = action.payload.orderBy
    },
  },
})

export const decksReducer = slice.reducer
export const decksActions = slice.actions
