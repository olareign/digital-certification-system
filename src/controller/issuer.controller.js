
const { BadRequestError } = require('../errors');
const issuer = require('../database/models/school.models')

const IssuerServices = require("../services/issuer.services");
const CredentialsServices = require("../services/credentials.service");

const signUpIssuer = async (req, res) => {
  try {
    const data = await IssuerServices.RegisterIssuer(req.body);
    if (!data) {
      return res.status(500).json({
        status: "failure",
        message: `Cannot register student`,
      });
    }
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: error?.message,
    });
  }
};

const loginIssuer = async (req, res) => {
  try {
    const data = await IssuerServices.loginIssuer(req.body);

    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(error?.statusCode).json({
      status: "failure",
      message: error?.message,
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const data = await IssuerServices.IssuerForgotPassword(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: error?.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const data = await IssuerServices.IssuerResetPassword(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: error?.message,
    });
  }
};

const issueCertificate = async (req, res) => {
  try {
    const {email} = req.user;
    const senderDetails = await issuer.findOne({email}).select('institution_name hander').lean()
    const data = await CredentialsServices.Create(req.body, senderDetails)
    if (!data) {
      return res.status(500).json({
        status: "failure",
        message: `Cannot Issue a certificate`,
      });
    }
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: error?.message,
    });
  }
}


module.exports = {
  signUpIssuer,
  loginIssuer,
  forgotPasswordController,
  resetPasswordController,
  issueCertificate
};

