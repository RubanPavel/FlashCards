import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  currentPage: number
  itemsPerPage: number
  question: string
}

const initialState: InitialState = {
  currentPage: 1,
  itemsPerPage: 10,
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
    setQuestion: (state, action: PayloadAction<{ question: string }>) => {
      state.question = action.payload.question
    },
  },
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
