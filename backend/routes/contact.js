const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact
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

    res.status(201).json({ message: "Message received" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
