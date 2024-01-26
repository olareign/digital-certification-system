const bcrypt = require('bcryptjs');
const { BadRequestError } = require('../errors');
const { v4: UUID } = require('uuid');

// This function takes a value and hashes it using bcryptjs.
const hashingModule = async (valueToHash) => {
    if (!valueToHash || typeof valueToHash !== 'string') {
        throw new BadRequestError('Invalid input for hashingModule');
    }
    const saltRounds = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash(valueToHash, saltRounds)
    if(!hashedValue){
        throw new BadRequestError('Failed to secure value')
    }
    return hashedValue;
}
// This function compares a real value with a hashed value and returns whether they match.
const compareValue = async (realValue, hashedValue) => {
    return await bcrypt.compare(realValue, hashedValue);
}

// This function generates a new UUID.
const uuid = () => UUID()

module.exports = {
    hashingModule,
    compareValue,
    uuid
}