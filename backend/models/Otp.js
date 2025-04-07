const Joi = require("joi");
const mongoose = require("mongoose");

// Define OTP Schema
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Auto-delete after 5 minutes
});

// Joi validation schema
const validateOTP = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
  });
  return schema.validate(data);
};

// Export Model & Validation
const OTP = mongoose.model("OTP", otpSchema);
module.exports = { OTP, validateOTP };
