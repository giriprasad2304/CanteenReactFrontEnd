const express = require('express')
const { authenticateUser } = require('../middleware/auth.middleware')
const { requireAdmin } = require('../middleware/admin.middleware')
const { addItem, updateMenuItem, deleteMenuItem, getAllOrders, updateOrderStatus, getAllUsers } = require('../controllers/admin.controller')

const route = express.Router()

route.use(authenticateUser, requireAdmin)

route.post('/add-item', addItem)
route.put('/menu/:id', updateMenuItem)
route.delete('/menu/:id', deleteMenuItem)
route.get('/orders', getAllOrders)
route.patch('/orders/:id/status', updateOrderStatus)
route.get('/users', getAllUsers)

module.exports = route