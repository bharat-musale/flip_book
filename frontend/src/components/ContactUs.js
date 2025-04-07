import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { sendContactMessage } from "../services/api";
import DashboardLayoutAdt from "./Layouts/DashboardLayoutAdt";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactUs = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Formik for Form Handling & Validation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      subject: Yup.string()
        .min(5, "Subject must be at least 5 characters")
        .required("Subject is required"),
      message: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await sendContactMessage(values);
        setSnackbar({
          open: true,
          message: "Message sent successfully!",
          severity: "success",
        });
        resetForm();
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to send message. Please try again.",
          severity: "error",
        });
      }
    },
  });

  return (
    <DashboardLayoutAdt>
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: "#003366" }}>
            Contact Us
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4, color: "#666" }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit}>
            {/* Name Field */}
            <TextField
              fullWidth
              label="Name"
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

            {/* Subject Field */}
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
              sx={styles.textField}
            />

            {/* Message Field */}
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={4}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              sx={styles.textField}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={styles.button}
            >
              Send Message
            </Button>
          </Box>
        </Paper>

        {/* Snackbar Alert for Success/Error Messages */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </DashboardLayoutAdt>
  );
};

export default ContactUs;

// 🌟 Custom Styles
const styles = {
  textField: {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "#c19a49" },
      "&.Mui-focused fieldset": { borderColor: "#003366" },
    },
  },
  button: {
    mt: 2,
    backgroundColor: "#003366",
    "&:hover": { backgroundColor: "#004b8f" },
  },
};
