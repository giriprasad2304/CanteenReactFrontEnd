import '../styles/Orders.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000'

const STATUS_COLOR = { pending: '#f59e0b', preparing: '#3b82f6', ready: '#10b981', delivered: '#6b7280' }

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) { navigate('/login'); return }

        axios.get(`${API_URL}/api/orders/my-orders`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setOrders(res.data.orders || []))
            .catch(err => setError(err?.response?.data?.message || 'Failed to load orders'))
            .finally(() => setLoading(false))
    }, [navigate])

    if (loading) return <div className="order-page"><p className="orders-loading">Loading orders…</p></div>
    if (error) return <div className="order-page"><p className="orders-error">{error}</p></div>

    const active = orders.filter(o => o.status !== 'delivered')
    const done = orders.filter(o => o.status === 'delivered')

    const fmt = (dateStr) => new Date(dateStr).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })

    const OrderCard = ({ order }) => (
        <div className="order-item">
            <div className="order-item-header">
                <span className="order-date">{fmt(order.createdAt)}</span>
                <span className="order-status-badge" style={{ background: STATUS_COLOR[order.status] }}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
            </div>
            <div className="order-items-list">
                {order.items.map((i, idx) => (
                    <div key={idx} className="order-line-item">
                        <span>{i.name} × {i.quantity}</span>
                        <span>₹{i.price * i.quantity}</span>
                    </div>
                ))}
            </div>
            <div className="order-total-row">
                <span>Total</span>
                <span>₹{order.total}</span>
            </div>
        </div>
    )

    return (
        <div className="order-page">
            <h1>My Orders</h1>

            {orders.length === 0 ? (
                <div className="orders-empty">
                    <p>No orders yet.</p>
                    <button className="cart-checkout" onClick={() => navigate('/dashboard')}>Browse Menu</button>
                </div>
            ) : (
                <>
                    {active.length > 0 && (
                        <div className="Active_orders">
                            <h2>Active Orders</h2>
                            {active.map(o => <OrderCard key={o._id} order={o} />)}
                        </div>
                    )}
                    {done.length > 0 && (
                        <div className="Completed_orders">
                            <h2>Completed Orders</h2>
                            {done.map(o => <OrderCard key={o._id} order={o} />)}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Orders