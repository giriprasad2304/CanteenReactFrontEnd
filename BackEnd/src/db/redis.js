const redis = require('redis');

const redisURL = process.env.REDIS_URI || 'redis://localhost:6379';
const redisClient = redis.createClient({
    url: redisURL,
    socket: {
        tls: redisURL.startsWith('rediss://'),
        rejectUnauthorized: false, // Often required for managed Redis providers
        // Provide a bounded reconnect strategy to survive idle timeouts without infinite spam
        reconnectStrategy: (retries) => {
            if (retries > 10) return new Error('Max Redis reconnect retries reached');
            return Math.min(retries * 100, 3000); // Wait up to 3 seconds between retries
        }
    }
});

let errorLogged = false;
redisClient.on('error', (err) => {
    // Log the actual error to help debug!
    if (!errorLogged) {
        console.error('Redis connection error event:', err.message);
        console.warn('Redis is not connected (cache will be skipped).');
        errorLogged = true;
    }
});

async function connectRedis() {
    try {
        // Redact the password for safe logging
        const safeUrl = redisURL.replace(/:([^:@]+)@/, ':***@');
        console.log(`Attempting to connect to Redis at: ${safeUrl}`);
        
        await redisClient.connect();
        console.log("Redis connected successfully !!!");
    } catch (err) {
        console.error('Redis connection failed:', err);
    }
}

module.exports = { redisClient, connectRedis };
