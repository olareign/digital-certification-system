const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const student = require("../database/models/student.models");
const responses = require("../utils/response");
const generateResetPin = require("../utils/generateResetPin")
const sendMail = require("../utils/sendMail");
dotenv = require("dotenv");
dotenv.config();



const signUp = async (payload) => {
  const foundEmail = await student.findOne({ email: payload.email });
  if (foundEmail) {
    return responses.buildFailureResponse("Email already exists", 400);
  }
  payload.password = await bcrypt.hash(payload.password, 10);
  role = payload.role;

  const savedStudent = await student.create(payload);
  return responses.buildSuccessResponse(
    "Registration Successful",
    201,
    savedStudent
  );
};

const login = async (payload) => {
  const foundStudent = await student.findOne({ email: payload.email });

  if (!foundStudent) {
    return responses.buildFailureResponse("student not found", 404);
  }

  const foundPassword = await bcrypt.compare(
    payload.password,
    foundStudent.password
  );
  if (!foundPassword) {
    return responses.buildFailureResponse("Password incorrect", 400);
  }

  const token = jwt.sign(
    {
      _id: foundStudent._id,
      
    },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
  foundStudent.token = token;
  return responses.buildSuccessResponse("Login Successful", 200, foundStudent, token);
};

const forgotPassword = async (payload) => {
  const studentEmail = await student.findOne({ email: payload.email });
  if (!studentEmail) {
    return responses.buildFailureResponse("Invalid Email", 400);
  }

  // Check if the resetPin has already been used.
  if (studentEmail.resetPin) {
    return responses.buildFailureResponse("Reset Pin has already been used", 400);
  }

  const resetPin = generateResetPin();
  const updatedStudent = await student.findByIdAndUpdate(
    { _id: studentEmail._id },
    { resetPin: resetPin },
    { new: true }
  );

  const forgotPasswordPayload = {
    to: updatedStudent.email,
    subject: "RESET PASSWORD",
    pin: resetPin,
  };

  sendMail.sendForgotPasswordMail(forgotPasswordPayload);

  return responses.buildSuccessResponse("Reset Pin sent successfully", 200, updatedStudent);
};

const resetPassword = async (payload) => {
  const studentAndPin = await student.findOne({
    email: payload.email,
    resetPin: payload.resetPin,
  });

  if (!studentAndPin) {
    return responses.buildFailureResponse("Invalid Pin", 400);
  }

  if (!studentAndPin.resetPin) {
    return responses.buildFailureResponse("Reset Pin has already been used", 400);
  }

  const saltRounds = 10;
  const generatedSalt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);


  const updatedStudent = await student.findByIdAndUpdate(
    { _id: studentAndPin._id },
    { password: hashedPassword, resetPin: null }, 
    { new: true }
  );

  return responses.buildSuccessResponse("Password Reset Successful", 200, updatedStudent);
};


module.exports = {
  signUp,
  login,
  forgotPassword,
  resetPassword,
};
