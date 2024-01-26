const Mongoose = require("mongoose");
const { uuid } = require("../../utils/hashing.modules");

const schoolSchema = Mongoose.Schema({
  institution_name: {
    type: String,
    required: true
  },
  handler: {
    type: String,
    required: true,
  },
  institution_location: {
    type: String,
    required: true
  },
  institution_ID: {
    type: String,
    required: true,
    default: uuid()
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'Issuer',
  }
}, {
  timestamps: true
});

module.exports = Mongoose.model("Schools", schoolSchema);