import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import authReducer from './authSlice'

const localStorageMiddleware = store => next => action => {
    const result = next(action)
    const state = store.getState()
    localStorage.setItem('cart', JSON.stringify(state.cart))
    if (action.type.startsWith('auth/')) {
        if (state.auth.token) {
            localStorage.setItem('token', state.auth.token)
            localStorage.setItem('user', JSON.stringify(state.auth.user))
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
    return result
}

const store = configureStore({
    reducer: { cart: cartReducer, auth: authReducer },
    middleware: getDefault => getDefault().concat(localStorageMiddleware)
})

export default store
