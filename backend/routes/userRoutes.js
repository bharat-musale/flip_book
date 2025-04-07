const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllCertificates,
  getCertificatesByMail,
  getCertificatesByRecordNo,
} = require("../controllers/certificateController");
const router = express.Router();

// router.get("/certificates", authMiddleware, getAllCertificates);
router.get("/certificates", getAllCertificates);
router.post("/certificates/email", getCertificatesByMail);
router.post("/certificates/preview", getCertificatesByRecordNo);
module.exports = router;
