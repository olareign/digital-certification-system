dotenv = require("dotenv");
const issuer = require("../database/models/school.models");
const responses = require("../utils/response");

const { NotFoundError, BadRequestError } = require("../errors");
const sendMail = require("../utils/sendMail");

const generateResetPin = require("../utils/generateResetPin");
const { hashingModule, compareValue } = require("../utils/hashing.modules");
const { createToken, decodeToken, tokenPayload } = require("../utils/jwt");
dotenv.config();


const RegisterIssuer = async (payload) => {
    const checkEmail = await issuer.findOne({ email: payload.email });
    if (checkEmail) {
      throw new BadRequestError('Email already register')
    }

    const hashedPassword = await hashingModule(payload.password)
    payload.password = hashedPassword;
  
    const IssuerAccount = await issuer.create(payload);
    return responses.buildSuccessResponse(
      "Registration Successful",
      201,
      IssuerAccount
    );
  };
  
const loginIssuer = async (payload) => {
    const IssuerAccount = await issuer.findOne({ email: payload.email });
  
    if (!IssuerAccount) {
        throw new NotFoundError('Email not registered')
    }
  
    const checkPassword = await compareValue(payload.password, IssuerAccount.password)
    if (!checkPassword) {
        throw new BadRequestError('Incorrect password')
    }

    const tokenData = tokenPayload(payload)
    const token = create({...tokenData})

    return responses.buildSuccessResponse("Login Successful", 200, IssuerAccount, token);
  };
  
const IssuerForgotPassword = async (payload) => {
    const issuerEmail = await issuer.findOne({ email: payload.email });
    if (!issuerEmail) {
      return responses.buildFailureResponse("Invalid Email", 400);
    }
  
    // Check if the resetPin has already been used.
    if (issuerEmail.resetPin) {
      return responses.buildFailureResponse("Reset Pin has already been used", 400);
    }
  
    const resetPin = generateResetPin();
    const updatedUser = await student.findByIdAndUpdate(
      { _id: issuerEmail._id },
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
  
const IssuerResetPassword = async (payload) => {
    const issuerAndPin = await issuer.findOne({
      email: payload.email,
      resetPin: payload.resetPin,
    });
  
    if (!issuerAndPin) {
        throw new BadRequestError('Invalid Pin');
    }
  
    if (!issuerAndPin.resetPin) {
        throw new BadRequestError('Pin has already been used');
    }
    
    const hashedPassword = hashingModule(payload.password)
 
    const updatedUser = await issuer.findByIdAndUpdate(
      { _id: issuerAndPin._id },
      { password: hashedPassword, resetPin: null }, 
      { new: true }
    );
  
    return responses.buildSuccessResponse("Password Reset Successful", 200, updatedUser);
};
  
module.exports = {
    RegisterIssuer,
    loginIssuer,
    IssuerForgotPassword,
    IssuerResetPassword
}