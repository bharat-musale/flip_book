import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RenderLeftPage({
  recordData,
  foundRecord,
  isSignedUp,
}) {
  const navigate = useNavigate(); // ✅ use the hook here

  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        border: "8px double #003366",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "#003366", textAlign: "center" }}
      >
        Certificate #{foundRecord?.recordNo}
      </Typography>

      <Typography variant="h6" sx={{ mb: 3, color: "#666" }}>
        Issued to: {foundRecord?.issuedTo}
      </Typography>

      {isSignedUp ? (
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "#444",
            textAlign: "center",
            padding: "20px",
            background: "#f8f9fa",
            borderRadius: "4px",
            border: "1px solid #e9ecef",
          }}
        >
          {foundRecord?.text}
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            my: 4,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              textAlign: "center",
            }}
          >
            Sign up or login to view complete certificate details
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/signup")} 
            sx={{
              bgcolor: "#003366",
              "&:hover": { bgcolor: "#004d99" },
              width: "200px",
            }}
          >
            Know More
          </Button>
        </Box>
      )}
    </Box>
  );
}
