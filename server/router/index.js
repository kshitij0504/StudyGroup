const express = require("express");
const {
  signup,
  VerifyOTP,
  GoogleAuth,
} = require("../Controller/auth.controller");
const checkEmail = require("../Controller/login.controller");
const router = express.Router();
const getUserDetailstoken = require("../Helper/getuserwebtoken");
const updateUser = require("../Controller/updateUser.controller");
const { createGroup, getGroups, getparticularGroup, addMemberToGroup } = require("../Controller/group.controller");
router.post("/signup", signup);

router.post("/signin", checkEmail);

router.post("/verify-otp", VerifyOTP);

router.post("/google-auth", GoogleAuth);

router.put("/update/:userId", getUserDetailstoken, updateUser);

router.post("/creategroup", getUserDetailstoken,createGroup);

router.get("/displaygroups", getGroups);

router.post('/groups/add-member', addMemberToGroup);

router.get("/groups/:id", getparticularGroup)
module.exports = router;
