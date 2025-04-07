import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LeftPage({ recordData, isSignedUp }) {
  const navigate = useNavigate();
  if (!recordData) return <div>Loading...</div>;
  console.log(recordData);

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
      {isSignedUp ? (
        <Box sx={{ width: "100%", height: "100%" }}>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              color: "#003366",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Certificate : 
            { recordData?.country +
              "-" +
              recordData?.state +
              "-" +
              recordData?.recordNo}
          </Typography>

          {/* <Typography variant="h6" sx={{ mb: 3, color: "#666" }}>
            Issued to: {recordData?.issuedTo}
          </Typography> */}
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "#444",
              borderRadius: "4px",
              border: "1px solid #e9ecef",
              padding:"3px 6px"
            }}
          >
            {recordData?.description}
          </Typography>
        </Box>
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
            onClick={() => navigate("/login")}
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
