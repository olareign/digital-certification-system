const express = require('express');
const router =  express.Router()

const {
    signUp,
    login,
    forgotPasswordController,
    resetPasswordController,
  } = require('../controller/verifier.controller.js');

router.get('/register', signUp)
router.get('/login', login)
router.get('/forgot_password', forgotPasswordController)
router.get('/reset_password', resetPasswordController)

module.exports = router;
