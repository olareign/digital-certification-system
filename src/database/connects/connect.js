const mongoose = require('mongoose');

const connectDB = async (uri) => {
    try {
        console.log('Before connection: ', uri);
        const conn = await mongoose.createConnection(uri);
        // console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`MongoDB Connected...`);
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

<<<<<<< HEAD
module.exports = connectDB
=======
module.exports = connectDB;
>>>>>>> ad64afc7773f9692a5922636abc0a1feead773d3
