import '../styles/Cart.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { removeItem, updateQty, clearCart } from '../store/cartSlice'

const API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000'

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [placing, setPlacing] = useState(false)
    const [msg, setMsg] = useState('')

    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

    const handleCheckout = async () => {
        const token = localStorage.getItem('token')
        if (!token) { navigate('/login'); return }
        setPlacing(true)
        try {
            await axios.post(`${API_URL}/api/orders/create`, { items: cart, total }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch(clearCart())
            setMsg('Order placed successfully! 🎉')
            setTimeout(() => navigate('/dashboard/orders'), 1500)
        } catch (err) {
            setMsg(err?.response?.data?.message || 'Failed to place order')
        } finally {
            setPlacing(false)
        }
    }

    if (cart.length === 0) return (
        <div className="cart-page">
            <div className="cart-items">
                <div className="cart-empty">
                    <span className="cart-empty-icon">🛒</span>
                    <p>Your cart is empty. Add items from the menu!</p>
                    <button className="cart-checkout" onClick={() => navigate('/dashboard')}>Browse Menu</button>
                </div>
            </div>
        </div>
    )

    return (
        <div className="cart-page">
            <div className="cart-items">
                <h2 className="cart-title">Your Cart</h2>
                {cart.map(item => (
                    <div key={item._id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                        <div className="cart-item-info">
                            <p className="cart-item-name">{item.name}</p>
                            <p className="cart-item-price">₹{item.price} each</p>
                        </div>
                        <div className="cart-item-controls">
                            <button className="qty-btn" onClick={() => dispatch(updateQty({ id: item._id, qty: item.quantity - 1 }))}>−</button>
                            <span className="qty-value">{item.quantity}</span>
                            <button className="qty-btn" onClick={() => dispatch(updateQty({ id: item._id, qty: item.quantity + 1 }))}>+</button>
                        </div>
                        <p className="cart-item-subtotal">₹{item.price * item.quantity}</p>
                        <button className="cart-remove-btn" onClick={() => dispatch(removeItem(item._id))}>✕</button>
                    </div>
                ))}
                <div className="cart-total">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
                {msg && <div className={`cart-msg ${msg.includes('success') ? 'success' : 'error'}`}>{msg}</div>}
                <button className="cart-checkout" onClick={handleCheckout} disabled={placing}>
                    {placing ? 'Placing Order…' : 'Place Order'}
                </button>
            </div>
        </div>
    )
}

export default Cart