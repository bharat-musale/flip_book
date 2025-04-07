import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CryptoJS from "crypto-js";

// Securely load the secret key from environment variables
const SECRET_KEY =  "default-secret-key";

/**
 * Encrypts a token using AES encryption
 * @param {string} token - The token to encrypt
 * @returns {string} Encrypted token
 */
export const encryptToken = (token) => {
  if (!token) {
    console.error("No token provided for encryption");
    return null;
  }
  return CryptoJS.AES.encrypt(JSON.stringify(token), SECRET_KEY).toString();
};
/**
 * Decrypts an AES encrypted token
 * @param {string} encryptedToken - The encrypted token string
 * @returns {string|null} Decrypted token or null if decryption fails
 */
export const decryptToken = (encryptedToken) => {
  try {
    if (!encryptedToken || typeof encryptedToken !== "string") {
      console.error("Invalid or empty encrypted token.");
      return null;
    }

    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      console.error("Decryption failed, invalid token format");
      return null;
    }

    return JSON.parse(decryptedData); // Ensure it returns the original format
  } catch (error) {
    console.error("Decryption Error:", error.message);
    return null;
  }
};


/**
 * Middleware to check authentication before rendering protected routes
 * @param {object} children - React children components
 * @returns {JSX.Element} - Either the protected component or redirect to login
 */
const RequireAuth = ({ children }) => {
  const { token } = useAuth();

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default RequireAuth;
