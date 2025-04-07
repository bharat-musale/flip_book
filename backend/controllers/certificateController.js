const { number, date } = require("joi");
const { Certificate, validateCertificate } = require("../models/Certificate");
const generateUniqueRecordNo = require("../services/generateUniqeNumber");
exports.addCertificate = async (req, res) => {
  const certificates = req.body;

  if (!Array.isArray(certificates) || certificates.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid or empty certificate list." });
  }

  try {
    const savedCertificates = [];

    for (const cert of certificates) {
      const recordNo = await generateUniqueRecordNo(cert.country, cert.state);

      const certificateObj = {
        recordNo,
        person_name: cert.person_name,
        record_name: cert.record_name,
        email: cert.email,
        country: cert.country,
        state: cert.state,
        description: cert.description || "",
        type: cert.type || "Single",
        m_id: cert.m_id,
        date: cert.date || new Date(),
      };

      const { error } = validateCertificate(certificateObj);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const newCert = new Certificate(certificateObj);
      const saved = await newCert.save();
      savedCertificates.push(saved);
    }

    res.status(201).json({message: "Certificates added successfully",numberOfCertificates:savedCertificates.length, certificates:savedCertificates,status:201});
  } catch (err) {
    console.error("Certificate Creation Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getAllCertificates = async (req, res) => {
  try {
      const certificates = await Certificate.find();
      res.send({status:200, message: "Certificates fetched successfully", certificates });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error",status:500,error:error.message });
  }

};

// exports.deleteCertificate = async (req, res) => {
//   await Certificate.findByIdAndDelete(req.params.id);
//   res.send("Certificate deleted");
// };
// Controller - publishCertificate.js
exports.publishCertificate = async (req, res) => {
  console.log("Publishing:", req.params.id);
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    certificate.isPublished = true;
    await certificate.save();

    res.status(200).json({ message: "Certificate published successfully" });
  } catch (err) {
    console.error("Publish Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
