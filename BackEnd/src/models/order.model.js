const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'item' },
        name: String,
        price: Number,
        quantity: Number,
        image: String
    }],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'preparing', 'ready', 'delivered'], default: 'pending' }
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)
