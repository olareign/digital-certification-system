const mongoose = require('mongoose');

const connectDB = async (mongo_uri) => {
    try {
        const conn = await mongoose.connect(mongo_uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    // Listen for error events on the connection
    mongoose.connection.on('error', err => {
        console.error('Error occurred: ', err);
    });

    // Listen for disconnected event
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB Disconnected');
    });

    // Listen for reconnected event
    mongoose.connection.on('reconnected', () => {
        console.log('MongoDB Reconnected');
    });

    // Listen for close event
    mongoose.connection.on('close', () => {
        console.log('MongoDB Connection Closed');
    });
}

module.exports = connectDB;
