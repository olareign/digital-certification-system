const express = require('express');
const dotenv = require('dotenv');
const helmet = require("helmet");
const morgan = require('morgan')
const cors = require('cors');
const statusCode = require('http-status-codes');
dotenv.config();

const connectDb = require('./database/connects/connect.js');

// middlewares
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./database/connects/connect.js');
const issuerRoutes = require('./router/issuer.router.js');
const verifierRoutes = require('./router/verifier.router.js');
const studentRoutes = require('./router/student.routes.js');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('tiny'));

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));

app.get('/', async (req, res) => {
    res.status(200).send('Welcome to VeriSynth, a Digital certification system');
});

// app.use('api/v1/verifier', issuerRouter);
app.use('api/v1/issuer', issuerRoutes);
app.use('api/v1/verifier', verifierRoutes);
app.use('api/v1/student', studentRoutes);

app.use(errorHandlerMiddleware)
app.use(notFound);

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
