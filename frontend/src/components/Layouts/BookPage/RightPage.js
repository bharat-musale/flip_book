import React from "react";
import { Box, Button } from "@mui/material";
import Certificate from "../Certificate";
import onDownloadPDF from "../../../services/downloadCertificate";

const RightPage = ({ recordData = {}, download=false }) => {
  console.log(recordData);
    const onDownload = (cert) => {
      onDownloadPDF(cert);
    };
  if (!recordData) return <div>Loading...</div>;

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
      <Box sx={{ width: "100%", height: "100%" }}>
        <Certificate recordData={recordData} />
        <Box
          sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
        >
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={onDownload}
            disabled={!download}
          >
            Download
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RightPage;
