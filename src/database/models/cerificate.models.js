const Mongoose = require("mongoose");
const { uuid } = require("../../utils/hashing.modules");

const certificateSchema = Mongoose.Schema({
  certificate_ID: {
    type: String,
    required: true,
    default: uuid()
  },
  recipient_email: {
    type: String,
    required: true,
    index: true
  },
  recipient_ID: {
    type: String,
    required: true,
    index: true
  },
  degreeName: {
    type: String,
    required: true
  },
  degreeType: {
    type: String,
    required: true
  },
  awarded_date: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
  },
  issuance_date: {
    type: String,
    required: true
  },
  expiration_date: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
module.exports = Mongoose.model("Certificate", certificateSchema);