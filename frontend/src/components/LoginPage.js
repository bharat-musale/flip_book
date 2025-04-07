import React from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../services/api";
import { SECRET_KEY, decryptToken, encryptToken } from "../services/RequireAuth";

const LoginPage = () => {
  const navigate = useNavigate();

const formik = useFormik({
  initialValues: {
    email: "",
    otp: "",
    otpSent: false,
  },
  validationSchema: Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    otp: Yup.string()
      .matches(/^[0-9]{4}$/, "OTP must be 4 digits")
      .optional(),
  }),
  onSubmit: async (values, { setSubmitting, setErrors }) => {
    try {
      console.log(formik.values);
      if (!formik.values.otpSent) {
        await auth.sendOTP(values.email);
        formik.setFieldValue("otpSent", true);
      } else {
        const response = await auth.verifyOTP(values.email, values.otp);
        // localStorage.setItem("token", response.data.token);
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        console.log(response.data.data.role );
        if(response.data.data.role === "admin"){
          navigate("/admin");
        }else{
        navigate("/", { state: { user: response.data.data.user } });
        }
        window.location.reload();
      }
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || "An error occurred",
      });
    }
    setSubmitting(false);
  },
});


  return (
    <Container maxWidth="sm" sx={useStyles.container}>
      {/* Background Logo */}
      <Box sx={useStyles.circleLogo} />

      {/* Login Box */}
      <Paper elevation={3} sx={useStyles.paper}>
        <Box sx={useStyles.content}>
          {/* Login Title */}
          <Typography variant="h4" sx={useStyles.title}>
            Login
          </Typography>
          <Box sx={useStyles.form}>
          {/* Form */}
          <form onSubmit={formik.handleSubmit} clsassName="form" style={{ width: "100%",display:"flex",flexDirection:"column",}} >
            <Box sx={useStyles.formTop} style={{ marginBottom: formik.errors.general && '0px' }}>
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{...useStyles.textField,}}
            />

            {/* OTP Field (Only Visible When OTP Sent) */}
            {formik.values.otpSent && (
              <TextField
                fullWidth
                label="Enter OTP"
                {...formik.getFieldProps("otp")}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                sx={useStyles.textField}
              />
            )}

           
            </Box>
            <Box sx={useStyles.formBottom}>
               {/* Error Message */}
            {formik.errors.general && (
              <Typography color="error" sx={useStyles.errorText}>
                {formik.errors.general}
              </Typography>
            )}
            {/* Action Buttons */}
            <Box sx={useStyles.formActions}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={formik.isSubmitting}
                sx={useStyles.button}
              >
                {formik.values.otpSent ? "Verify OTP" : "Send OTP"}
              </Button>
            </Box>
                      {/* Sign Up Link */}
          <Typography variant="body2" sx={useStyles.signUpText}>
            Don't have an account?
            <Link
              component="button"
              onClick={() => navigate("/signup")}
              sx={useStyles.link}
            >
              Sign Up
            </Link>
          </Typography>
          </Box>
          </form>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;

const useStyles = {
  container: {
    height: "95vh",
    // height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // background: "#fafafa",
  },
  // circleLogo: {
  //   position: "absolute",
  //   width: 300,
  //   height: 300,
  //   borderRadius: "50%",
  //   // backgroundImage: "url(/book-of-record-logo.png)",
  //   backgroundSize: "contain",
  //   backgroundRepeat: "no-repeat",
  //   backgroundPosition: "center",
  //   opacity: 0.3, // Adjust for better visibility
  //   zIndex: 0,
  // },
  paper: {
    padding: 4,
    width: "100%",
    borderRadius: 2,
    border: "2px solid #c19a49",
    background: "#fff",
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // minHeight:'350px'
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    gap:'2rem'
  },
  form:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    // gap:'3rem'
  },
  title: {
    color: "#003366",
    fontWeight: "bold",
  },
  textField: {
    marginBottom: 3,
    zIndex: 1,
  },
  button: {
    backgroundColor: "#003366",
    "&:hover": { backgroundColor: "#004d99" },
  },
  errorText: {
    marginTop: 2,
    textAlign: "center",
  },
  formActions: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
  },
  link: {
    color: "#c19a49",
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },
  signUpText: {
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    marginTop: "10px",
  },
};
