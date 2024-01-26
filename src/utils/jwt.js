const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.SECRET || '';
const expiry = process.env.EXPIRATION || '2d';

const tokenPayload = (user)=>{
    return {
        firstname: user.firstname,
        lastname: userlastname,
        fullname: user.fullname,
        email: user.email,
        userId: user.userId,
        role: user.role
    }
}

const createToken = ({payload}) => {
    return jsonwebtoken.sign(payload, secret, {
        expiresIn: expiry,
    })
}

const decodeToken = (token) => {
    return jsonwebtoken.verify(token, secret)
}

module.exports = {
    createToken,
    decodeToken,
    tokenPayload
}