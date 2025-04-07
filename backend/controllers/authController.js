const { User, validateUser } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../services/otpservice");
const { OTP } = require("../models/Otp");



exports.register = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ status: 400, message: "Email already registered" });

  try {user = new User(req.body);
  await user.save();
 res
   .status(201)
   .json({
     status: 201,
     message: "User registered successfully",
   });
  } catch (error) {
    res
      .status(500)
      .json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1️⃣ Check if the user exists
    const user = await User.findOne({ email }).select("-password");
    if (!user) return res.status(400).json({ message: "Invalid email" });

    // 2️⃣ Retrieve latest OTP
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ message: "OTP expired or not found." });
    }

    // 3️⃣ Check if OTP is hashed
    let isOTPValid;
    if (otpRecord.otp.startsWith("$2b$")) {
      isOTPValid = await bcrypt.compare(otp, otpRecord.otp); // If OTP is hashed
    } else {
      isOTPValid = otpRecord.otp === otp; // If OTP is plain text
    }

    if (!isOTPValid) return res.status(400).json({ message: "Invalid OTP" });

    // 4️⃣ Delete OTP after successful validation
    await OTP.deleteOne({ _id: otpRecord._id });

    // 5️⃣ Generate JWT Token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Login successful", data: user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Send OTP API
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ status: 400, message: "Email is required" });

    // Step 1: Check if the user exists in the User collection
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ status: 404, message: "User not found" });

    const otp = generateOTP();

    // Step 2: Check if an OTP entry already exists
    const existingOTP = await OTP.findOne({ email });

    if (existingOTP) {
      // Step 3: If OTP exists, update it
      await OTP.updateOne({ email }, { $set: { otp, createdAt: new Date() } });
    } else {
      // Step 4: If no OTP exists, create a new entry
      await OTP.create({ email, otp });
    }

    console.log(`OTP for ${user.email}: ${otp}`);
    return res
      .status(200)
      .json({ status: 200, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};