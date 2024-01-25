const studentServices = require("../services/student.services");

const signUp = async (req, res) => {
  try {
    const data = await studentServices.signUp(req.body);
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
    const data = await studentServices.login(req.body);

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
    const data = await studentServices.forgotPassword(req.body);
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
    const data = await studentServices.resetPassword(req.body);
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

