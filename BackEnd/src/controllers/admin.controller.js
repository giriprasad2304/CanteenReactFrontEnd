const itemModel = require('../models/item.model')
const orderModel = require('../models/order.model')
const userModel = require('../models/user.model')
const { redisClient } = require('../db/redis')

async function addItem(req, res) {
    try {
        const item = await itemModel.create(req.body)
        await redisClient.del('menu')
        res.status(201).json({ message: 'Item added successfully', item })
    } catch (err) {
        console.error('addItem error:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function updateMenuItem(req, res) {
    try {
        const item = await itemModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!item) return res.status(404).json({ message: 'Item not found' })
        await redisClient.del('menu')
        res.json({ message: 'Item updated', item })
    } catch (err) {
        console.error('updateMenuItem error:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function deleteMenuItem(req, res) {
    try {
        const item = await itemModel.findByIdAndDelete(req.params.id)
        if (!item) return res.status(404).json({ message: 'Item not found' })
        await redisClient.del('menu')
        res.json({ message: 'Item deleted' })
    } catch (err) {
        console.error('deleteMenuItem error:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function getAllOrders(req, res) {
    try {
        const orders = await orderModel.find({}).populate('userId', 'username email').sort({ createdAt: -1 })
        res.json({ orders })
    } catch (err) {
        console.error('getAllOrders error:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function updateOrderStatus(req, res) {
    try {
        const { status } = req.body
        const order = await orderModel.findByIdAndUpdate(req.params.id, { status }, { new: true })
        if (!order) return res.status(404).json({ message: 'Order not found' })
        res.json({ message: 'Status updated', order })
    } catch (err) {
        console.error('updateOrderStatus error:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await userModel.find({}, '-password').sort({ createdAt: -1 })
        res.json({ users })
    } catch (err) {
        console.error('getAllUsers error:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { addItem, updateMenuItem, deleteMenuItem, getAllOrders, updateOrderStatus, getAllUsers }