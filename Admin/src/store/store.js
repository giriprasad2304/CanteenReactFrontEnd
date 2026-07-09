import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

const persistMiddleware = store => next => action => {
    const result = next(action)
    const { auth } = store.getState()
    if (auth.token) {
        localStorage.setItem('admin_token', auth.token)
        localStorage.setItem('admin_user', JSON.stringify(auth.user))
    } else {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
    }
    return result
}

const store = configureStore({
    reducer: { auth: authReducer },
    middleware: getDefault => getDefault().concat(persistMiddleware)
})

export default store
