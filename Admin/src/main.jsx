import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminOrders from './admin/AdminOrders'
import AdminMenu from './admin/AdminMenu'
import AdminUsers from './admin/AdminUsers'

const router = createBrowserRouter([
    { path: '/login', element: <AdminLogin /> },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to="/orders" replace /> },
            { path: 'orders', element: <AdminOrders /> },
            { path: 'menu', element: <AdminMenu /> },
            { path: 'users', element: <AdminUsers /> },
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
)
