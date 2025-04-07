const express = require("express");
const {
  register,
  login,
  sendOTP,
  logout,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/logout", logout);

module.exports = router;
