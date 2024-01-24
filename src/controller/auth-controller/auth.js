import statusCode from 'http-status-codes';

export const HTTPRegister = async function(req, res) {
    try {
        res.status(statusCode.OK).send('Hello register')
        
    } catch (error) {
        throw error;
    }
}