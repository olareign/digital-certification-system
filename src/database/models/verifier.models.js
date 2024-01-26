const Mongoose = require("mongoose");
const { uuid } = require("../../utils/hashing.modules");

const verifierSchema = Mongoose.Schema({
  verifier_id: {
    type: String,
    required: true,
    default: uuid()
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
    default: function(){
        return `${this.firstName} ${this.lastName}`
      }
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: 'verifier',
  },
  password:{
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

module.exports = Mongoose.model("Verifier", verifierSchema);