const Mongoose = require("mongoose");

const schoolSchema = Mongoose.Schema({
  schoolName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  AccreditedNumber: {
    type: String,
    required: true
  },
  
}, {
  timestamps: true
});
module.exports = Mongoose.model("Schools", schoolSchema);