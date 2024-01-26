const express = require('express');
const router =  express.Router()

const {
    signUpIssuer,
    loginIssuer,
    forgotPasswordController,
    resetPasswordController,
  } = require('../controller/issuer.controller.js');

router.get('/register', signUpIssuer)
router.get('/login', loginIssuer)
router.get('/forgot_password', forgotPasswordController)
router.get('/reset_password', resetPasswordController)

module.exports = router;
