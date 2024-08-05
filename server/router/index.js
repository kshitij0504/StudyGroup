const express = require("express");
const {
  signup,
  VerifyOTP,
  GoogleAuth,
} = require("../Controller/auth.controller");
const checkEmail = require("../Controller/login.controller");
const router = express.Router();
const getUserDetailstoken = require("../Helper/getuserwebtoken")
const updateUser = require("../Controller/updateUser.controller");
router.post("/signup", signup);

router.post("/signin", checkEmail);

router.post("/verify-otp", VerifyOTP);

router.post("/google-auth", GoogleAuth);

router.put("/update/:userId", getUserDetailstoken, updateUser);
module.exports = router;
