import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { MdOutlineEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { FaUtensils } from 'react-icons/fa6'
import { setAuth } from '../store/authSlice'
import '../styles/Auth.css'

const API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)
        
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, {
                email: e.target.email.value,
                password: e.target.password.value,
            })
            dispatch(setAuth({ token: res.data.token, user: res.data.user }))
            navigate(res.data.user.role === 'admin' ? '/admin' : '/dashboard')
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || 'Login failed')
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo"><FaUtensils /></div>
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to your CraveCanteen account</p>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="auth-input-group">
                        <label htmlFor="email"><MdOutlineEmail className="form-icon" /> Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <div className="auth-input-group">
                        <label htmlFor="loginPassword"><RiLockPasswordLine className="form-icon" /> Password</label>
                        <input type="password" id="loginPassword" name="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="auth-submit-btn">Log In</button>
                </form>

                <div className="auth-divider">or</div>

                <div className="auth-footer">
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                    <a className="auth-home-link" href="/"><IoMdHome className="home-icon" /> Back to Home</a>
                </div>
            </div>
        </div>
    )
}

export default Login
