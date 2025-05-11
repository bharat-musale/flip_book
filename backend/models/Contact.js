const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    purpose: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "contactus", 
  }
);

module.exports = mongoose.model("Contact", contactSchema);
