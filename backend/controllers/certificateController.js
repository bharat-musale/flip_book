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

    res.status(201).json({
      message: "Certificates added successfully",
      numberOfCertificates: savedCertificates.length,
      certificates: savedCertificates,
      status: 201,
    });
  } catch (err) {
    console.error("Certificate Creation Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = (await Certificate.find()).reverse();
    res.send({
      status: 200,
      message: "Certificates fetched successfully",
      certificates,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};

exports.deleteCertificate = async (req, res) => {
  console.log(req.body)
  try {
   const certificate = await Certificate.findById(req.body.id);
   certificate.isDeleted = true;
   await certificate.save();
   res.status(200).json({
     message: "Certificate deleted successfully",
     status: 200,
   });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};
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

    res.status(200).json({ message: "Certificate published successfully", status: 200, certificate });
  } catch (err) {
    console.error("Publish Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCertificatesByMail = async (req, res) => {
  try {
    const certificates = await Certificate.find({ email: req.body.email });
    const filteredForPublishedAndDeleted = certificates.filter((cert) => cert.isPublished === true && cert.isDeleted === false);
    if (filteredForPublishedAndDeleted.length === 0) {
      return res.status(404).json({
        message: "No certificates found for the provided email",
        status: 404,
        certificates: filteredForPublishedAndDeleted,
      });
    }
    res.status(200).json({
      message: "Certificates fetched successfully",
      status: 200,
      certificates: filteredForPublishedAndDeleted,
    });
  } catch (err) {
    console.error("Error fetching certificates by email:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCertificatesByRecordNo = async (req, res) => {
  try {
    const { recordNo } = req.body;

    if (!recordNo) {
      return res.status(400).json({ message: "Record number is required" });
    }

    const [country, state, number] = recordNo.split("-");

    if (!country || !state || !number) {
      return res.status(400).json({ message: "Invalid record number format" });
    }

    const countryData = await Certificate.find({ country: country });
    const stateData = countryData.filter((cert) => cert.state === state);
    const recordNoData = stateData.filter((cert) => cert.recordNo === number);

    if (recordNoData[0]?.isPublished === false) {
      return res
        .status(404)
        .json({ status: 404, message: "Certificate not published" });
    } 
    if (recordNoData[0]?.isDeleted === true) {
      return res
        .status(404)
        .json({ status: 404, message: "Certificate not fount" });
    }

    if (recordNoData?.length == 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Certificate not found" });
    }

    return res.status(200).json({ status: 200, certificate: recordNoData });
  } catch (error) {
    console.error("Error fetching certificate by recordNo:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};
