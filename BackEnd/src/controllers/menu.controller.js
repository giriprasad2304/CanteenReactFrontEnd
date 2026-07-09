const itemModel = require('../models/item.model')

const { redisClient } = require('../db/redis');

async function getItems(req, res) {
    try {
        const cachedMenu = await redisClient.get('menu');
        if (cachedMenu) {
            return res.status(200).json({
                success: true,
                message: "Items retrieved from cache",
                item: JSON.parse(cachedMenu)
            });
        }

        const item = await itemModel.find({});
        
        await redisClient.setEx('menu', 3600, JSON.stringify(item));

        return res.status(200).json({
            success: true,
            message: "Items retrieved from database",
            item: item
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = { getItems }