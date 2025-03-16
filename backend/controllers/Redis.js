const { createClient } = require("redis");
const dotenv = require("dotenv");

dotenv.config();

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    password: process.env.REDIS_PASSWORD
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

(async () => {
    await redisClient.connect();
    console.log("Connected to Redis ✅");
})();

module.exports = redisClient;