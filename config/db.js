const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: process.cwd() + '/config/.env' });

const connectDB = async ()=> {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB is connected`);
}

module.exports = connectDB;