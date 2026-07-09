import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user') || 'null')

const authSlice = createSlice({
    name: 'auth',
    initialState: { token, user },
    reducers: {
        setAuth(state, action) {
            state.token = action.payload.token
            state.user = action.payload.user
        },
        clearAuth(state) {
            state.token = null
            state.user = null
        }
    }
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
