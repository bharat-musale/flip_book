import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../services/api";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const recordData = location.state?.recordData;
  const [error, setError] = useState("");

  // Formik for Form Handling & Validation
  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "" },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits").required("Phone is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setError("");
      try {
        const response = await auth.signup(values);
        // localStorage.setItem("token", response.data.token);
        navigate("/login");
        console.log(response);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
      setSubmitting(false);
    },
  });

  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Box sx={styles.formWrapper}>
        <Paper elevation={3} sx={styles.paper}>
          <Typography variant="h4" sx={styles.title}>
            Sign Up
          </Typography>

          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            {/* Name Field */}
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={styles.textField}
            />

            {/* Email Field */}
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={styles.textField}
            />

            {/* Phone Field */}
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              sx={styles.textField}
            />

            {/* Error Message */}
            {error && (
              <Typography color="error" sx={styles.errorText}>
                {error}
              </Typography>
            )}

            {/* Submit Button */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={formik.isSubmitting}
                sx={styles.button}
              >
                {formik.isSubmitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Sign Up"}
              </Button>

              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/login", { state: { recordData } })}
                  sx={styles.link}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignupPage;

// 🌟 Custom Styles
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // background: "linear-gradient(135deg, #003366 0%, #001a33 100%)",
  },
  formWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    padding: 4,
    width: "100%",
    borderRadius: 2,
    backgroundColor: "#fff",
    border: "2px solid #c19a49",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 2,
  },
  textField: {
    marginBottom: 3,
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "#c19a49" },
      "&.Mui-focused fieldset": { borderColor: "#003366" },
    },
  },
  errorText: {
    marginTop: 2,
    textAlign: "center",
  },
  button: {
    marginTop: 2,
    backgroundColor: "#003366",
    "&:hover": { backgroundColor: "#004d99" },
  },
  link: {
    color: "#c19a49",
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },
};
