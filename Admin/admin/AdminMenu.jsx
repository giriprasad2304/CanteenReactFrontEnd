import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000'
const CATEGORIES = ['starter', 'main course', 'side', 'beverage']
const EMPTY_FORM = { name: '', price: '', Quantity: '', category: 'starter', image: '' }

const AdminMenu = () => {
    const token = useSelector(state => state.auth.token)
    const headers = { Authorization: `Bearer ${token}` }

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState(EMPTY_FORM)
    const [editId, setEditId] = useState(null)
    const [feedback, setFeedback] = useState({ msg: '', type: '' })
    const [showForm, setShowForm] = useState(false)

    const flash = (msg, type = 'success') => {
        setFeedback({ msg, type })
        setTimeout(() => setFeedback({ msg: '', type: '' }), 3000)
    }

    const fetchItems = useCallback(() => {
        setLoading(true)
        axios.get(`${API_URL}/api/menu/get-menu`)
            .then(res => setItems(res.data.item || []))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => { fetchItems() }, [fetchItems])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = { ...form, price: Number(form.price), Quantity: Number(form.Quantity) }
        try {
            if (editId) {
                const res = await axios.put(`${API_URL}/api/admin/menu/${editId}`, payload, { headers })
                setItems(prev => prev.map(i => i._id === editId ? res.data.item : i))
                flash('Item updated')
            } else {
                const res = await axios.post(`${API_URL}/api/admin/add-item`, payload, { headers })
                setItems(prev => [...prev, res.data.item])
                flash('Item added')
            }
            setForm(EMPTY_FORM)
            setEditId(null)
            setShowForm(false)
        } catch (err) {
            flash(err?.response?.data?.message || 'Save failed', 'error')
        }
    }

    const handleEdit = (item) => {
        setForm({ name: item.name, price: item.price, Quantity: item.Quantity, category: item.category, image: item.image })
        setEditId(item._id)
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this item?')) return
        try {
            await axios.delete(`${API_URL}/api/admin/menu/${id}`, { headers })
            setItems(prev => prev.filter(i => i._id !== id))
            flash('Item deleted')
        } catch {
            flash('Delete failed', 'error')
        }
    }

    const cancelEdit = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(false) }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h1 className="admin-page-title" style={{ margin: 0 }}>Menu Items</h1>
                <button className="admin-btn admin-btn-primary" onClick={() => { cancelEdit(); setShowForm(v => !v) }}>
                    {showForm && !editId ? '✕ Cancel' : '+ Add Item'}
                </button>
            </div>

            {feedback.msg && <div className={`admin-feedback ${feedback.type}`}>{feedback.msg}</div>}

            {showForm && (
                <div className="admin-card" style={{ marginBottom: 24 }}>
                    <h3 style={{ margin: '0 0 18px', fontWeight: 700 }}>{editId ? 'Edit Item' : 'New Menu Item'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="admin-form-grid">
                            <div className="admin-form-group">
                                <label>Name</label>
                                <input required placeholder="e.g. Chicken Biryani" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                            </div>
                            <div className="admin-form-group">
                                <label>Price (₹)</label>
                                <input required type="number" min="1" placeholder="150" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                            </div>
                            <div className="admin-form-group">
                                <label>Quantity in Stock</label>
                                <input required type="number" min="0" placeholder="20" value={form.Quantity} onChange={e => setForm(f => ({ ...f, Quantity: e.target.value }))} />
                            </div>
                            <div className="admin-form-group">
                                <label>Category</label>
                                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="admin-form-group admin-form-full">
                                <label>Image URL</label>
                                <input required placeholder="https://..." value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
                            </div>
                        </div>
                        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                            <button type="submit" className="admin-btn admin-btn-primary">{editId ? 'Save Changes' : 'Add Item'}</button>
                            <button type="button" className="admin-btn admin-btn-warning" onClick={cancelEdit}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="admin-card">
                {loading ? (
                    <div className="admin-empty">Loading…</div>
                ) : items.length === 0 ? (
                    <div className="admin-empty">No menu items yet.</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr><th></th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item._id}>
                                    <td><img src={item.image} alt={item.name} className="admin-item-thumb" /></td>
                                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                                    <td><span className="status-badge status-preparing">{item.category}</span></td>
                                    <td style={{ fontWeight: 700 }}>₹{item.price}</td>
                                    <td>{item.Quantity}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button className="admin-btn admin-btn-warning admin-btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                                            <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item._id)}>Delete</button>
                                        </div>
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

export default AdminMenu
