import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  email: string
}

const initialState: InitialState = {
  email: '',
}

const slice = createSlice({
  initialState,
  name: 'userEmail',
  reducers: {
    setEmail: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email
    },
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
