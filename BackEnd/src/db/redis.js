const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URI || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

async function connectRedis() {
    try {
        await redisClient.connect();
        console.log("Redis connected successfully !!!");
    } catch (err) {
        console.error('Redis connection failed:', err);
    }
}

module.exports = { redisClient, connectRedis };
