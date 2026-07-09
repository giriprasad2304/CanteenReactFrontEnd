import '../styles/Profile.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { MdLogout, MdPerson, MdEmail, MdHistoryEdu, MdPhone } from 'react-icons/md'
import { clearAuth } from '../store/authSlice'

const API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000'

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authUser = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)

    const [user, setUser] = useState(authUser || {})
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const headers = { Authorization: `Bearer ${token}` }
        Promise.all([
            axios.get(`${API_URL}/api/user/profile`, { headers, withCredentials: true }),
            axios.get(`${API_URL}/api/orders/my-orders`, { headers })
        ])
            .then(([profileRes, ordersRes]) => {
                const fresh = profileRes.data.profile
                setUser({ id: fresh._id, username: fresh.username, email: fresh.email, role: fresh.role })
                setOrders(ordersRes.data.orders || [])
            })
            .catch(err => console.error('Profile fetch error:', err?.message))
            .finally(() => setLoading(false))
    }, [token])

    const handleLogout = async () => {
        try { await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true }) } catch {}
        dispatch(clearAuth())
        navigate('/login')
    }

    const initials = user?.username ? user.username.slice(0, 2).toUpperCase() : 'U'

    return (
        <div className="profile-page">
            <div className="profile-hero">
                <div className="profile-avatar">
                    <span className="profile-initials">{initials}</span>
                </div>
                <h2 className="profile-name">{loading ? 'Loading…' : user?.username || 'User Name'}</h2>
                <p className="profile-role">{user?.role || 'Member'}</p>
            </div>

            <div className="profile-card">
                <h3 className="profile-section-title">Account Details</h3>
                <div className="profile-info-row">
                    <span className="profile-info-icon"><MdPerson /></span>
                    <div className="profile-info-content">
                        <span className="profile-info-label">Name</span>
                        <span className="profile-info-value">{user?.username || '—'}</span>
                    </div>
                </div>
                <div className="profile-divider" />
                <div className="profile-info-row">
                    <span className="profile-info-icon"><MdEmail /></span>
                    <div className="profile-info-content">
                        <span className="profile-info-label">Email</span>
                        <span className="profile-info-value">{user?.email || '—'}</span>
                    </div>
                </div>
                <div className="profile-divider" />
                <div className="profile-info-row">
                    <span className="profile-info-icon"><MdPhone /></span>
                    <div className="profile-info-content">
                        <span className="profile-info-label">Phone</span>
                        <span className="profile-info-value">—</span>
                    </div>
                </div>
            </div>

            <div className="profile-card">
                <h3 className="profile-section-title">
                    <MdHistoryEdu style={{ marginRight: 8, verticalAlign: 'middle' }} />
                    Order History
                </h3>
                {orders.length === 0 ? (
                    <div className="profile-empty-orders">
                        <span className="profile-empty-icon">🍽️</span>
                        <p>No orders yet. Start exploring the menu!</p>
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order._id} className="profile-order-row">
                            <span className="profile-order-items">
                                {order.items.map(i => `${i.name} ×${i.quantity}`).join(', ')}
                            </span>
                            <span className="profile-order-total">₹{order.total}</span>
                            <span className="profile-order-status">{order.status}</span>
                        </div>
                    ))
                )}
            </div>

            <button className="profile-logout-btn" onClick={handleLogout}>
                <MdLogout />
                Logout
            </button>
        </div>
    )
}

export default Profile
