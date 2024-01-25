
const Mongoose = require("mongoose");

const studentSchema = Mongoose.Schema({
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
  password: {
    type: String,
    required: true
  },
  resetPin: {
    type: Number
  },
  resetPinUsed: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});
module.exports = Mongoose.model("Students", studentSchema);