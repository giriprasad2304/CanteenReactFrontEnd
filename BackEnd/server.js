require('dotenv').config();
const express = require('express')
const app = require('./src/app')
const connectDB = require('./src/db/db')
const { connectRedis } = require('./src/db/redis')

connectDB();
connectRedis();

const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`server started at PORT ${PORT}`);
})