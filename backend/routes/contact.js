const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { sendContactEmail } = require("../middleware/Email");

router.post("/", async (req, res) => {
  try {
    const { name, email, mobile, purpose, description } = req.body;

    if (!name || !email || !mobile || !purpose || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({
      name,
      email,
      mobile,
      purpose,
      description,
    });

    await newContact.save();

    // ✅ Send email notification
    await sendContactEmail({ name, email, mobile, purpose, description });

    res.status(201).json({ message: "Message received and email sent" });
  } catch (error) {
    console.error("Error handling contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
