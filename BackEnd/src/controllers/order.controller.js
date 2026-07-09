const Order = require('../models/order.model')

async function createOrder(req, res) {
    try {
        const { items, total } = req.body
        if (!items?.length) return res.status(400).json({ message: 'Cart is empty' })

        const order = await Order.create({ userId: req.user.id, items, total })
        res.status(201).json({ message: 'Order placed', order })
    } catch (err) {
        console.error('createOrder error:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function getUserOrders(req, res) {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 })
        res.json({ orders })
    } catch (err) {
        console.error('getUserOrders error:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { createOrder, getUserOrders }
