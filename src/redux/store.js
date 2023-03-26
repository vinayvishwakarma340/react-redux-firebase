import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './userSlice'
import productReducer from './productSlice'

export const store = configureStore({
  reducer: {counterReducer,userReducer,productReducer},
})