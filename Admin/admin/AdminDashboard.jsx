import './Admin.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'

const AdminDashboard = () => {
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user || user.role !== 'admin') navigate('/login')
    }, [user, navigate])

    return (
        <div className="admin-layout">
            <AdminSideBar />
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard
