import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000'
const ROLE_CLASS = { user: 'status-ready', admin: 'status-pending' }

const AdminUsers = () => {
    const token = useSelector(state => state.auth.token)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get(`${API_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setUsers(res.data.users || []))
            .finally(() => setLoading(false))
    }, [token])

    const filtered = users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    const fmt = d => new Date(d).toLocaleDateString('en-IN', { dateStyle: 'medium' })

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h1 className="admin-page-title" style={{ margin: 0 }}>Users</h1>
                <input
                    style={{ padding: '8px 14px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: '0.875rem', width: 220 }}
                    placeholder="Search by name or email…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="admin-stats" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
                {[['Total', users.length, '#6366f1'], ['Regular', users.filter(u => u.role === 'user').length, '#10b981'], ['Admins', users.filter(u => u.role === 'admin').length, '#f59e0b']].map(([label, val, color]) => (
                    <div className="admin-stat-card" key={label}>
                        <div className="admin-stat-label">{label}</div>
                        <div className="admin-stat-value" style={{ color }}>{val}</div>
                    </div>
                ))}
            </div>

            <div className="admin-card">
                {loading ? <div className="admin-empty">Loading users…</div> : filtered.length === 0 ? (
                    <div className="admin-empty">No users found.</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr><th>#</th><th>Username</th><th>Email</th><th>Role</th><th>Joined</th></tr>
                        </thead>
                        <tbody>
                            {filtered.map((u, idx) => (
                                <tr key={u._id}>
                                    <td style={{ color: '#9ca3af' }}>{idx + 1}</td>
                                    <td style={{ fontWeight: 600 }}>{u.username}</td>
                                    <td style={{ color: '#6b7280' }}>{u.email}</td>
                                    <td><span className={`status-badge ${ROLE_CLASS[u.role] || 'status-pending'}`}>{u.role}</span></td>
                                    <td style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{fmt(u.createdAt || new Date())}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default AdminUsers
