const jwt = require("jsonwebtoken");
const student = require("../src/models/student.models");

  

async function authenticate(req, res, next) {
    try {
        const authorization = req.headers.authorization
        if(!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(400).json({
                message: "Authorization header must start with 'Bearer '",
                status: "failure"
            })
        }
        const token = authorization.substring(7)
        
        const decodedStudent = jwt.decode(token)
        
        const foundStudent = student.findOne({ _id: decodedStudent._id })
          
        req.student = foundStudent

      next();
    } catch (error) {
        return res.status(error?.statusCode || 500).send(error?.message || "Unable to authenticate")
    }
}

module.exports = {
authenticate
}
