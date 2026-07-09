import '../styles/Admin.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setAuth } from '../store/authSlice'

const API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000'

const AdminLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, {
                email: e.target.email.value,
                password: e.target.password.value,
            })
            if (res.data.user.role !== 'admin') {
                setError('Access denied. Admin accounts only.')
                return
            }
            dispatch(setAuth({ token: res.data.token, user: res.data.user }))
            navigate('/orders')
        } catch (err) {
            setError(err?.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <h1 className="admin-login-title">CraveCanteen</h1>
                <p className="admin-login-sub">Admin Panel — sign in to continue</p>

                {error && <div className="admin-login-error">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="admin-login-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="admin@example.com" required />
                    </div>
                    <div className="admin-login-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="admin-login-btn" disabled={loading}>
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
