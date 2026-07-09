const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')

const authRoutes = require('./routes/auth.route')
const profileRoutes = require('./routes/profile.route')
const adminRoutes = require('./routes/admin.route')
const menuRoutes = require('./routes/menu.route')
const orderRoutes = require('./routes/order.route')

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

app.use(limiter)
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/user', profileRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)

module.exports = app;