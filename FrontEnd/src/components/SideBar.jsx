import '../styles/SideBar.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SideBar = () => {
    const cartCount = useSelector(state => state.cart.reduce((s, i) => s + i.quantity, 0))

    return (
        <div className="sidebar_main">
            <div className="sidebar-content">
                <div className="sidebar-categories">
                    <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'category-item active' : 'category-item'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 3h18v18H3z" /><path d="M3 9h18" /><path d="M9 21V9" />
                        </svg>
                        <span>Menu</span>
                    </NavLink>

                    <NavLink to="/dashboard/cart" end className={({ isActive }) => isActive ? 'category-item active' : 'category-item'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span>Cart</span>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </NavLink>

                    <NavLink to="/dashboard/orders" end className={({ isActive }) => isActive ? 'category-item active' : 'category-item'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                        <span>My Orders</span>
                    </NavLink>

                    <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? 'category-item active' : 'category-item'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>Profile</span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default SideBar