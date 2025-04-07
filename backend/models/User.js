const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  // password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  otp: { type: Number },
  otpExpires: { type: Date },
});

// Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .required(), // Validates a 10-digit phone number
    
    role: Joi.string().valid("admin", "user").default("user"),
  });

  return schema.validate(user);
};

module.exports = { User: mongoose.model("User", userSchema), validateUser };
