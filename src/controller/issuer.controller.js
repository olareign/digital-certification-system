const statusCode = require('http-status-codes');

const HTTPRegister = async function(req, res) {
    try {
        res.status(statusCode.OK).send('Hello register')
        
    } catch (error) {
        throw error;
    }
}

module.exports = {
     HTTPRegister
    }; 