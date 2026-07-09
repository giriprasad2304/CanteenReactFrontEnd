import '../styles/Admin.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../store/authSlice'
import axios from 'axios'

const API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000'

const links = [
    {
        to: '/orders', label: 'Orders',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
    },
    {
        to: '/menu', label: 'Menu',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
    },
    {
        to: '/users', label: 'Users',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    },
]

const AdminSideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try { await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true }) } catch {}
        dispatch(clearAuth())
        navigate('/login')
    }

    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar-logo">Crave<span>Canteen</span><br /><small style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.6 }}>Admin Panel</small></div>
            {links.map(l => (
                <NavLink key={l.to} to={l.to} className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>
                    {l.icon} {l.label}
                </NavLink>
            ))}
            <div style={{ marginTop: 'auto' }}>
                <button className="admin-btn admin-btn-danger" style={{ width: '100%' }} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default AdminSideBar
