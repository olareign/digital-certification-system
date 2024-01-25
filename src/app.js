const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const statusCode = require('http-status-codes');
dotenv.config();

const connectDb = require('./database/connects/connect.js');
const notFound = require('./database/connects/connect.js');
const AuthRouter = require('./router/auth-router.js');
const studentRoutes = require('./router/student.routes.js');

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

app.use('api/v1/dcs', AuthRouter);
app.use(notFound);
app.use('/student', studentRoutes);

const port = process.env.PORT || '5454';
const url = process.env.MONGO_URL || '';

const start = async function () {
    try {
        await connectDb(url);
        app.listen(port, () => {
            console.log(`Server running at port : ${port}...`);
        });
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
};

start();
