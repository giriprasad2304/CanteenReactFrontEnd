import '../styles/Menu.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addItem } from '../store/cartSlice'

const API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000'
const CATEGORIES = ['starter', 'main course', 'side', 'beverage']

const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

const Menu = () => {
    const dispatch = useDispatch()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('all')
    const [search, setSearch] = useState('')
    const [toast, setToast] = useState('')

    const handleAddToCart = (item) => {
        dispatch(addItem(item))
        setToast(`${item.name} added to cart`)
        setTimeout(() => setToast(''), 2000)
    }

    useEffect(() => {
        axios.get(`${API_URL}/api/menu/get-menu`)
            .then(res => setItems(res.data.item || []))
            .catch(err => console.error('Failed to fetch menu:', err?.message))
            .finally(() => setLoading(false))
    }, [])

    const filtered = items.filter(item =>
        (activeCategory === 'all' || item.category === activeCategory) &&
        item.name.toLowerCase().includes(search.toLowerCase())
    )

    const grouped = CATEGORIES.reduce((acc, cat) => {
        const inCat = filtered.filter(i => i.category === cat)
        if (inCat.length) acc[cat] = inCat
        return acc
    }, {})

    const user = JSON.parse(localStorage.getItem('user') || '{}')

    return (
        <div className="main-content">
            <div className="menu-header">
                <div className="search-bar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input type="text" placeholder="Search for food..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">{user?.username || 'Guest'}</span>
                        <div className="user-avatar" />
                    </div>
                </div>
            </div>

            <div className="category-tabs">
                <button className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All</button>
                {CATEGORIES.map(cat => (
                    <button key={cat} className={`tab-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            <div className="menu-section">
                {loading ? (
                    <div className="menu-loading">Loading menu…</div>
                ) : filtered.length === 0 ? (
                    <div className="menu-empty">No items found.</div>
                ) : (
                    Object.entries(grouped).map(([category, catItems]) => (
                        <div key={category} className="category-section">
                            <div className="section-header">
                                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                            </div>
                            <div className="Menu_row">
                                {catItems.map(item => (
                                    <div key={item._id} className="Menu_card">
                                        <img src={item.image} alt={item.name} />
                                        <div className="Menu_card_body">
                                            <h3>{item.name}</h3>
                                            <div className="card-rating">
                                                <StarIcon />
                                                <span>{item.rating ?? '—'}</span>
                                            </div>
                                            <div className="Menu_card_footer">
                                                <span className="price">₹{item.price}</span>
                                                <button className="add-btn" onClick={() => handleAddToCart(item)}>Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
            {toast && <div className="cart-toast">{toast}</div>}
        </div>
    )
}

export default Menu