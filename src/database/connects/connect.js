import mongoose from 'mongoose';

const connectDb = async function (url) {
	return mongoose.connect(url)
}

export default connectDb;