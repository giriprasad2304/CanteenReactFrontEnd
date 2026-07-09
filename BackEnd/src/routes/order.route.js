const express = require('express')
const { createOrder, getUserOrders } = require('../controllers/order.controller')
const { authenticateUser } = require('../middleware/auth.middleware')

const route = express.Router()

route.post('/create', authenticateUser, createOrder)
route.get('/my-orders', authenticateUser, getUserOrders)

module.exports = route
