const mongoose = require('mongoose');

const connectDB = async (uri) => {
    try {
        console.log('Before connection: ', uri);
        const conn = await mongoose.createConnection(uri);
        // console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`MongoDB Connected...`);
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB
