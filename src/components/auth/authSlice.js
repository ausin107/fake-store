import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: !!window.localStorage.getItem('authKey') ? true : false,
  authKey: window.localStorage.getItem('authKey'),
  isLoading: false,
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLogin: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action) => {
      state.isAuth = true
      state.authKey = action.payload
      state.isLoading = false
    },
    loginFail: (state) => {
      state.isAuth = false
      state.isLoading = false
    },
    registerSuccess: (state) => {
      state.isLoading = false
    },
    logoutSuccess: (state) => {
      state.isAuth = false
      state.authKey = null
      state.isLoading = false
    },
  },
})
export const { loginSuccess, loginFail, startLogin, logoutSuccess, registerSuccess } =
  authSlice.actions //xuất ra 2 action auth
export default authSlice.reducer
