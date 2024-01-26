dotenv = require("dotenv");
const credential = require("../database/models/cerificate.models");
const responses = require("../utils/response");

const { NotFoundError, BadRequestError } = require("../errors");
const sendMail = require("../utils/sendMail");

const generateResetPin = require("../utils/generateResetPin");
const { hashingModule, compareValue } = require("../utils/hashing.modules");
const { createToken, decodeToken, tokenPayload } = require("../utils/jwt");
dotenv.config();


const Create = async (payload, sender) => {
    const Credential = await credential.create({...payload})

    const mailPayload = {
      to: Credential?.recipient_email,
      subject: "Congratulations!, Here's Your Certification",
      details: Credential,
      issuer: sender
    }
    
    sendMail.sendCredential(mailPayload);

    return responses.buildSuccessResponse(
      "Credentials Created and sent Successful",
      201,
      Credential
    );
  };
  
const Update = async (payload) => {
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
  
const Delete = async (payload) => {
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
  
const GetSingle = async (payload) => {
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
  
const GetAll = async (payload) => {
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
    Create,
    Update,
    Delete,
    GetSingle,
    GetAll
}