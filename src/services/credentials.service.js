dotenv = require("dotenv");
dotenv.config();

const credential = require("../database/models/cerificate.models");
const responses = require("../utils/response");
const sendMail = require("../utils/sendMail");
const { NotFoundError, BadRequestError } = require("../errors");




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
    
    // return responses.buildSuccessResponse("Login Successful", 200, IssuerAccount, token);
  };
  
const Delete = async (payload) => {
     
    // return responses.buildSuccessResponse("Reset Pin sent successfully", 200, updatedUser);
};
  
const GetSingle = async (payload) => {
    
    // return responses.buildSuccessResponse("Password Reset Successful", 200, updatedUser);
};
  
const GetAll = async (payload) => {
  
  // return responses.buildSuccessResponse("Password Reset Successful", 200, updatedUser);
};




module.exports = {
    Create,
    Update,
    Delete,
    GetSingle,
    GetAll
}