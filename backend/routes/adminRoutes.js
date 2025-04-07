const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addCertificate,
  deleteCertificate,
  getAllCertificates,
  publishCertificate,
} = require("../controllers/certificateController");
const router = express.Router();

// router.post("/certificate", authMiddleware, addCertificate);
router.post("/certificate", addCertificate);
router.get("/all-certificates", getAllCertificates);
// router.delete("/certificate/:id", authMiddleware, deleteCertificate);
router.put("/certificates/publish/:id", publishCertificate);

module.exports = router;
