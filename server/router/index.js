const express = require("express");
const { signup,VerifyOTP, GoogleAuth } = require("../Controller/auth.controller");
const checkEmail = require("../Controller/login.controller");
const router = express.Router();

router.post("/signup",signup)

router.post("/signin",checkEmail)

router.post("/verify-otp", VerifyOTP);

router.post("/google-auth", GoogleAuth)
module.exports =router