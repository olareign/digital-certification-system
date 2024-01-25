import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import statusCode from 'http-status-codes';
dotenv.config();


import connectDb from './database/connects/connect.js';
import notFound from './database/connects/connect.js'
import AuthRouter from './router/auth-router.js';
const studentRoutes = require("./router/student.routes.js");
// const connectDB = require("./configs/database.js");


const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };
  app.use(cors(corsOptions));

app.get('/', async (req, res) => {
    res.status(200).send('Welcome to VeriSynth, a Digital certification system');
});


app.use('api/v1/dcs', AuthRouter)
app.use(notFound)
app.use("/student", studentRoutes);

const port = process.env.PORT || '5454';
const url = process.env.MONGO_URL || '';
// connectDB(process.env.MONGO_URI)

const start = async function () {
	try{
		await connectDb(url)
		app.listen(port, () => {
			console.log(`Server running at port : ${port}...`);
		})		
	}catch(error) {
		console.log("Error: ", error);
		throw error;
	}
}

start()
