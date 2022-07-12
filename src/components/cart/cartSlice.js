import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authKey: null,
  products: [],
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      let check = 0
      state.products = state.products.map((product) => {
        if (product.id == action.payload.id) {
          product.quantity += action.payload.quantity
          check += 1
          return product
        } else return product
      })
      state.products = check == 0 ? [...state.products, action.payload] : state.products
      console.log(state.products)
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => {
        if (product.id != action.payload.id) {
          return product
        }
      })
    },
    increaseProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id == action.payload.id) {
          product.quantity += 1
          return product
        } else return product
      })
    },
    decreaseProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id == action.payload.id) {
          product.quantity -= 1
          return product
        } else return product
      })
    },
  },
})
export const { addProduct, removeProduct, increaseProduct, decreaseProduct } = cartSlice.actions
export default cartSlice.reducer
