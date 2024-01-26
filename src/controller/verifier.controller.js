
const { BadRequestError } = require('../errors');

const verifierServices = require("../services/verifier.services");

const signUp = async (req, res) => {
  try {
    const data = await verifierServices.Register(req.body);
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

const login = async (req, res) => {
  try {
    const data = await verifierServices.login(req.body);

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
    const data = await verifierServices.ForgotPassword(req.body);
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
    const data = await verifierServices.ResetPassword(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: error?.message,
    });
  }
};


module.exports = {
  signUp,
  login,
  forgotPasswordController,
  resetPasswordController,
};

