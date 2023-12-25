import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type orderByQuestion = 'question-asc' | 'question-desc'

type InitialState = {
  currentPage: number
  itemsPerPage: number
  orderBy: orderByQuestion
  question: string
}

const initialState: InitialState = {
  currentPage: 1,
  itemsPerPage: 10,
  orderBy: 'question-desc',
  question: '',
}

const slice = createSlice({
  initialState,
  name: 'cardsParams',
  reducers: {
    setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage
    },
    setItemsPerPage: (state, action: PayloadAction<{ itemsPerPage: number }>) => {
      state.itemsPerPage = action.payload.itemsPerPage
    },
    setOrderBy: (state, action: PayloadAction<{ orderBy: orderByQuestion }>) => {
      state.orderBy = action.payload.orderBy
    },
    setQuestion: (state, action: PayloadAction<{ question: string }>) => {
      state.question = action.payload.question
    },
  },
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
