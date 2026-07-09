import 'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import './index.css'
import App from './routers/App.jsx'
import Dashboard from './components/Dashboard.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/Signup.jsx'
import Home from './routers/Home.jsx'
import Profile from './components/Profile.jsx'
import Menu from './components/Menu.jsx'
import Cart from './components/Cart.jsx'
import Orders from './components/Orders.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'home', element: <Home /> },
            {
                path: 'dashboard',
                element: <Dashboard />,
                children: [
                    { index: true, element: <Menu /> },
                    { path: 'profile', element: <Profile /> },
                    { path: 'cart', element: <Cart /> },
                    { path: 'orders', element: <Orders /> },
                ],
            },
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <SignUp /> },
        ],
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
)
