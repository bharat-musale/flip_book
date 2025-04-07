const generateOTP = (digits = 4) => {
  const min = Math.pow(10, digits - 1); // Minimum value (e.g., 1000 for 4-digit)
  const max = Math.pow(10, digits) - 1; // Maximum value (e.g., 9999 for 4-digit)
  return Math.floor(min + Math.random() * (max - min + 1));
};


module.exports = { generateOTP };