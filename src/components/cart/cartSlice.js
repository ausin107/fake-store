import { createSlice } from '@reduxjs/toolkit'
const authKey = window.localStorage.getItem('authKey')
const productInfo = JSON.parse(window.localStorage.getItem(`${authKey}`))
const initialState = {
  authKey: !!authKey && !!productInfo && productInfo.authKey == authKey ? authKey : null,
  products:
    !!authKey && !!productInfo && productInfo.authKey == authKey ? productInfo.products : [],
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.authKey = !!authKey == true ? authKey : null
      let check = 0
      state.products = state.products.map((product) => {
        if (product.id == action.payload.id) {
          product.quantity += action.payload.quantity
          check += 1
          return product
        } else return product
      })
      state.products = check == 0 ? [...state.products, action.payload] : state.products
      window.localStorage.setItem(`${authKey}`, JSON.stringify(state))
      console.log(state.products)
    },
    removeProduct: (state, action) => {
      state.authKey = !!authKey == true ? authKey : null
      state.products = state.products.filter((product) => {
        if (product.id != action.payload.id) {
          return product
        }
      })
      window.localStorage.setItem(`${authKey}`, JSON.stringify(state))
    },
    increaseProduct: (state, action) => {
      state.authKey = !!authKey == true ? authKey : null
      state.products = state.products.map((product) => {
        if (product.id == action.payload.id) {
          product.quantity += 1
          return product
        } else return product
      })
      window.localStorage.setItem(`${authKey}`, JSON.stringify(state))
    },
    decreaseProduct: (state, action) => {
      state.authKey = !!authKey == true ? authKey : null
      state.products = state.products.map((product) => {
        if (product.id == action.payload.id) {
          product.quantity -= 1
          return product
        } else return product
      })
      window.localStorage.setItem(`${authKey}`, JSON.stringify(state))
    },
    checkOutProduct: (state) => {
      state.authKey = !!authKey == true ? authKey : null
      state.products = []
      window.localStorage.setItem(`${authKey}`, JSON.stringify(state))
    },
  },
})
export const { addProduct, removeProduct, increaseProduct, decreaseProduct, checkOutProduct } =
  cartSlice.actions
export default cartSlice.reducer
