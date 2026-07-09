const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URI || 'redis://localhost:6379',
    socket: {
        reconnectStrategy: false // Don't keep retrying if Redis is down (stops log spam)
    }
});

let errorLogged = false;
redisClient.on('error', (err) => {
    if (!errorLogged) {
        console.warn('Redis is not connected (cache will be skipped).');
        errorLogged = true;
    }
});

async function connectRedis() {
    try {
        await redisClient.connect();
        console.log("Redis connected successfully !!!");
    } catch (err) {
        console.error('Redis connection failed:', err);
    }
}

module.exports = { redisClient, connectRedis };
