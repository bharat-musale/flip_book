import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookView from "./components/BookView";
import AdminPanel from "./components/AdminPanel";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import ContactUs from "./components/ContactUs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Certificate from "./components/Layouts/Certificate";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./services/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "96vh",
          backgroundColor: "#fafafa",
        }}
      >
        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <BookView />
                </RequireAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminPanel />
                </RequireAuth>
              }
            />
            <Route path="/signup" element={<SignupPage />} />{" "}
            <Route path="/login" element={<LoginPage />} />{" "}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cer" element={<Certificate />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
