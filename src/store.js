import { configureStore } from '@reduxjs/toolkit'
import authReducer from './components/auth/authSlice'
import cartSlice from './components/cart/cartSlice'
export const store = configureStore({
  reducer: {
    isAuth: authReducer,
    cartProducts: cartSlice,
  },
})
