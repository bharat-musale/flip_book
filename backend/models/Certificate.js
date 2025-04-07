const mongoose = require("mongoose");
const Joi = require("joi");

const certificateSchema = new mongoose.Schema({
  recordNo: { type: String, unique: true, required: true },
  person_name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  // generatedCode: { type: String, unique: true },
  description: { type: String },
  type: { type: String, default: "Single" },
  date: { type: Date, default: Date.now },
  record_name: { type: String, default: "Certificate",required:true },
  m_id: { type: String },
  isDeleted: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
});

const validateCertificate = (cert) => {
  const schema = Joi.object({
    recordNo: Joi.string().required(),
    person_name: Joi.string().required(),
    email: Joi.string().email().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string().default("Single"),
    date: Joi.date().default(Date.now),
    record_name: Joi.string().default("Certificate"),
    m_id: Joi.string(),
    isDeleted: Joi.boolean().default(false),
    isPublished: Joi.boolean().default(false),
  });
  return schema.validate(cert);
};

module.exports = {
  Certificate: mongoose.model("Certificate", certificateSchema),
  validateCertificate,
};
