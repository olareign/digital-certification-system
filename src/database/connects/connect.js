import mongoose from 'mongoose';

const connectDb = async function (url) {
	return mongoose.connect(url)
}

export default connectDb;




// const mongoose = require('mongoose');

// const connectDB = async (mongo_uri) => {
//     try {
//         const conn = await mongoose.connect(mongo_uri);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(error)
//         process.exit(1)
//     }
// }

// module.exports = connectDB