const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log('MongoDB connection SUCCESS at ' + process.env.MONGO_URI);
    } catch (error) {
        console.error('MongoDB connection FAIL');
        process.exit(1);
    }
}

module.exports = connectDB;