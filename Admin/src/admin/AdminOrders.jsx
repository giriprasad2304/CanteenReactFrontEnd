import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000'
const STATUSES = ['pending', 'preparing', 'ready', 'delivered']
const STATUS_CLASS = { pending: 'status-pending', preparing: 'status-preparing', ready: 'status-ready', delivered: 'status-delivered' }

const AdminOrders = () => {
    const token = useSelector(state => state.auth.token)
    const headers = { Authorization: `Bearer ${token}` }

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [feedback, setFeedback] = useState('')

    const fetchOrders = useCallback((background = false) => {
        if (!background) setLoading(true)
        axios.get(`${API_URL}/api/admin/orders`, { headers })
            .then(res => setOrders(res.data.orders || []))
            .catch(() => setFeedback('Failed to load orders'))
            .finally(() => setLoading(false))
    }, [token])

    useEffect(() => { 
        fetchOrders()
        const interval = setInterval(() => fetchOrders(true), 5000)
        return () => clearInterval(interval)
    }, [fetchOrders])

    const updateStatus = async (orderId, status) => {
        try {
            await axios.patch(`${API_URL}/api/admin/orders/${orderId}/status`, { status }, { headers })
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o))
        } catch {
            setFeedback('Failed to update status')
        }
    }

    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        preparing: orders.filter(o => o.status === 'preparing').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
    }

    const fmt = d => new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })

    return (
        <>
            <h1 className="admin-page-title">Orders</h1>

            <div className="admin-stats">
                {[['Total', stats.total, '#f59e0b'], ['Pending', stats.pending, '#ef4444'], ['Preparing', stats.preparing, '#3b82f6'], ['Delivered', stats.delivered, '#10b981']].map(([label, val, color]) => (
                    <div className="admin-stat-card" key={label}>
                        <div className="admin-stat-label">{label}</div>
                        <div className="admin-stat-value" style={{ color }}>{val}</div>
                    </div>
                ))}
            </div>

            {feedback && <div className="admin-feedback error">{feedback}</div>}

            <div className="admin-card">
                {loading ? (
                    <div className="admin-empty">Loading orders…</div>
                ) : orders.length === 0 ? (
                    <div className="admin-empty">No orders yet.</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Customer</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th><th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{order.userId?.username || '—'}</div>
                                        <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{order.userId?.email}</div>
                                    </td>
                                    <td style={{ maxWidth: 200 }}>{order.items.map(i => `${i.name} ×${i.quantity}`).join(', ')}</td>
                                    <td style={{ fontWeight: 700 }}>₹{order.total}</td>
                                    <td style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{fmt(order.createdAt)}</td>
                                    <td><span className={`status-badge ${STATUS_CLASS[order.status]}`}>{order.status}</span></td>
                                    <td>
                                        <select className="status-select" value={order.status} onChange={e => updateStatus(order._id, e.target.value)}>
                                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default AdminOrders
