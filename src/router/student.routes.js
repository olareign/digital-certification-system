const express = require("express");
const studentControllers = require("../controller/student.controllers");
const studentValidation = require("../middleware/student.validation");
const router = express.Router();

router.post("/signup", studentValidation, studentControllers.signUp);
router.post("/login", studentControllers.login);
router.post("/forgot-password", studentControllers.forgotPasswordController);
router.post("/reset-password", studentControllers.resetPasswordController);



module.exports = router; 