const { Certificate } = require("../models/Certificate");

const generateUniqueGeneratedCode = async () => {
  let isUnique = false;
  let generatedCode;

  while (!isUnique) {
    generatedCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    const exists = await Certificate.findOne({ generatedCode });
    if (!exists) isUnique = true;
  }

  return generatedCode;
};

module.exports = generateUniqueGeneratedCode;
