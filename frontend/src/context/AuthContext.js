import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decryptToken } from "../services/RequireAuth"; // ✅ FIXED: Removed incorrect import

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser =JSON.parse( localStorage.getItem("user"));

  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(storedUser ?? false); // Convert to boolean
  const navigate = useNavigate();

  // ✅ Automatically check token on page load
  useEffect(() => {
    // if (!token) {
    //   navigate("/login");
    // }
  }, [token, navigate]);

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setToken(null);
    setUser(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook to Use Auth
export const useAuth = () => useContext(AuthContext);
