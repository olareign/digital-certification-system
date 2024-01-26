dotenv = require("dotenv");
const verifier = require("../database/models/verifier.models");
const responses = require("../utils/response");

const { NotFoundError, BadRequestError } = require("../errors");
const sendMail = require("../utils/sendMail");

const generateResetPin = require("../utils/generateResetPin");
const { hashingModule, compareValue } = require("../utils/hashing.modules");
const { createToken, decodeToken, tokenPayload } = require("../utils/jwt");
dotenv.config();


const Register = async (payload) => {
    const checkEmail = await verifier.findOne({ email: payload.email });
    if (checkEmail) {
      throw new BadRequestError('Email already register')
    }

    const hashedPassword = await hashingModule(payload.password)
    payload.password = hashedPassword;
  
    const verifierAccount = await verifier.create(payload);
    return responses.buildSuccessResponse(
      "Registration Successful",
      201,
      verifierAccount
    );
  };
  
const login = async (payload) => {
    const verifierAccount = await verifier.findOne({ email: payload.email });
  
    if (!verifierAccount) {
        throw new NotFoundError('Email not registered')
    }
  
    const checkPassword = await compareValue(payload.password,verifierAccount.password)
    if (!checkPassword) {
        throw new BadRequestError('Incorrect password')
    }

    const tokenData = tokenPayload(payload)
    const token = create({...tokenData})

    return responses.buildSuccessResponse("Login Successful", 200, verifierAccount, token);
  };
  
const ForgotPassword = async (payload) => {
    const verifierEmail = await verifier.findOne({ email: payload.email });
    if (!verifierEmail) {
      return responses.buildFailureResponse("Invalid Email", 400);
    }
  
    // Check if the resetPin has already been used.
    if (verifierEmail.resetPin) {
      return responses.buildFailureResponse("Reset Pin has already been used", 400);
    }
  
    const resetPin = generateResetPin();
    const updatedUser = await student.findByIdAndUpdate(
      { _id: verifierEmail._id },
      { resetPin: resetPin },
      { new: true }
    );
  
    const forgotPasswordPayload = {
      to: updatedUser.email,
      subject: "RESET PASSWORD",
      pin: resetPin,
    };
  
    sendMail.sendForgotPasswordMail(forgotPasswordPayload);
  
    return responses.buildSuccessResponse("Reset Pin sent successfully", 200, updatedUser);
};
  
const ResetPassword = async (payload) => {
    const verifierAndPin = await student.findOne({
      email: payload.email,
      resetPin: payload.resetPin,
    });
  
    if (!verifierAndPin) {
        throw new BadRequestError('Invalid Pin');
    }
  
    if (!verifierAndPin.resetPin) {
        throw new BadRequestError('Pin has already been used');
    }
    
    const hashedPassword = hashingModule(payload.password)
 
    const updatedUser = await verifier.findByIdAndUpdate(
      { _id: verifierAndPin._id },
      { password: hashedPassword, resetPin: null }, 
      { new: true }
    );
  
    return responses.buildSuccessResponse("Password Reset Successful", 200, updatedUser);
};
  
module.exports = {
    Register,
    login,
    ForgotPassword,
    ResetPassword
}