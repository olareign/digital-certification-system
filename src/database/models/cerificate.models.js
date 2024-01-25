
const Mongoose = require("mongoose");

const certificateSchema = Mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true
  },
  certificateType: {
    type: String
  },
}, {
  timestamps: true
});
module.exports = Mongoose.model("Certificate", certificateSchema);