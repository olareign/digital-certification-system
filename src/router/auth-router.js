import express from 'express'
const router =  express.Router()

import { HTTPRegister } from '../controller/auth-controller/auth.js'


router.get('/register', HTTPRegister)
// router('/').post()

export default router;
