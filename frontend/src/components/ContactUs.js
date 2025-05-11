import React, { useState } from "react";
import {
  Snackbar,
  Alert,
  MenuItem,
  Box,
  Button as MuiButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendContactMessage } from "../services/api";
import DashboardLayoutAdt from "./Layouts/DashboardLayoutAdt";
import "./ContactUsModern.css"; // Include your modern CSS here

const ContactUs = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      purpose: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).required("Name is required"),
      email: Yup.string().email().required("Email is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
        .required("Mobile is required"),
      purpose: Yup.string().required("Purpose is required"),
      description: Yup.string().min(10).required("Description is required"),
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
      } catch {
        setSnackbar({
          open: true,
          message: "Failed to send message. Try again.",
          severity: "error",
        });
      }
    },
  });

  return (
    <DashboardLayoutAdt>
      <div className="background">
        <div className="container">
          <div className="screen">
            <div className="screen-header">
              <div className="screen-header-left">
                <div className="screen-header-button close"></div>
                <div className="screen-header-button maximize"></div>
                <div className="screen-header-button minimize"></div>
              </div>
              <div className="screen-header-right">
                <div className="screen-header-ellipsis"></div>
                <div className="screen-header-ellipsis"></div>
                <div className="screen-header-ellipsis"></div>
              </div>
            </div>

            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              className="screen-body"
            >
              <div className="screen-body-item left">
                <div className="app-title">
                  <span>CONTACT</span>
                  <span>US</span>
                </div>
                <div className="app-contact">CONTACT INFO : +91 1234567890</div>
              </div>
              <div className="screen-body-item">
                <div className="app-form">
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      placeholder="NAME"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="error-text">{formik.errors.name}</div>
                    )}
                  </div>

                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      placeholder="EMAIL"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="error-text">{formik.errors.email}</div>
                    )}
                  </div>

                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      placeholder="CONTACT NO"
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                      <div className="error-text">{formik.errors.mobile}</div>
                    )}
                  </div>

                  <div className="app-form-group">
                    <select
                      className="app-form-control"
                      name="purpose"
                      value={formik.values.purpose}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select Purpose</option>
                      <option value="Support">Support</option>
                      <option value="Sales">Sales</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                    {formik.touched.purpose && formik.errors.purpose && (
                      <div className="error-text">{formik.errors.purpose}</div>
                    )}
                  </div>

                  <div className="app-form-group message">
                    <textarea
                      className="app-form-control"
                      placeholder="DESCRIPTION"
                      name="description"
                      rows={3}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                      <div className="error-text">
                        {formik.errors.description}
                      </div>
                    )}
                  </div>

                  <div className="app-form-group buttons">
                    <MuiButton
                      variant="text"
                      color="error"
                      onClick={() => formik.resetForm()}
                      className="app-form-button"
                    >
                      CANCEL
                    </MuiButton>
                   
<button class="send-button">
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          fill="currentColor"
          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
        ></path>
      </svg>
    </div>
  </div>
  <span>Send</span>
</button>

                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </DashboardLayoutAdt>
  );
};

export default ContactUs;
