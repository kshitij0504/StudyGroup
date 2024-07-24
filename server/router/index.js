const express = require("express");
const { signup,VerifyOTP } = require("../Controller/auth.controller");
const checkEmail = require("../Controller/login.controller");
const router = express.Router();

router.post("/signup",signup)

router.post("/signin",checkEmail)

router.post("/verify-otp", VerifyOTP);
module.exports =router