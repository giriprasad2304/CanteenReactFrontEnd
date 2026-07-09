require('dotenv').config();
const mongoose = require('mongoose')

async function connectDB() {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("connection established successfully !!!");
    }
    catch(err){
        console.error('DataBase error :', err);
    }
}

module.exports = connectDB;