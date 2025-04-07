const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getAllCertificates } = require("../controllers/certificateController");
const router = express.Router();

// router.get("/certificates", authMiddleware, getAllCertificates);
router.get("/certificates", getAllCertificates);
module.exports = router;
