const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["starter", "main course", "side", "beverage"],
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const itemModel = mongoose.model("item", itemSchema)

module.exports = itemModel