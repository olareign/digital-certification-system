const express = require('express');
const router =  express.Router()

const { HTTPRegister } = require('../controller/issuer.controller.js');


router.get('/register', HTTPRegister)
// router('/').post()

module.exports = router;
