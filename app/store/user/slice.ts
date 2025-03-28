import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const storeKey = '@redux/user'

export interface User {
  id: string
  email: string
  name: string
}

export interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

