import { createSlice } from '@reduxjs/toolkit'

const stored = JSON.parse(localStorage.getItem('cart') || '[]')

const cartSlice = createSlice({
    name: 'cart',
    initialState: stored,
    reducers: {
        addItem(state, action) {
            const item = action.payload
            const existing = state.find(i => i._id === item._id)
            if (existing) {
                existing.quantity += 1
            } else {
                state.push({ _id: item._id, name: item.name, price: item.price, image: item.image, quantity: 1 })
            }
        },
        removeItem(state, action) {
            return state.filter(i => i._id !== action.payload)
        },
        updateQty(state, action) {
            const { id, qty } = action.payload
            if (qty < 1) return state.filter(i => i._id !== id)
            const item = state.find(i => i._id === id)
            if (item) item.quantity = qty
        },
        clearCart() {
            return []
        }
    }
})

export const { addItem, removeItem, updateQty, clearCart } = cartSlice.actions
export default cartSlice.reducer
