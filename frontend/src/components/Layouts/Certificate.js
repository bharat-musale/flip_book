import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { formatDate, getCountryName, getStateName } from "../../services/certificateDataUpdate";

export default function Certificate({ recordData }) {
  console.log(recordData);
  const safe = (val) => val || "***";

  return (
    <Box
      id="certificate-section"
      sx={{
        position: "relative",
        border: "3px solid gold",
        p: 2,
        maxWidth: 600,
        margin: "auto",
        backgroundImage: "url(/map.png)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          zIndex: 1,
        },
        "& > *": { position: "relative", zIndex: 2 },
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <img
          src="book-of-record-logo.png"
          alt="Book of World Record"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            border: "2px solid #a98c46",
            padding: "2px",
          }}
        />
      </Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        color="goldenrod"
        align="center"
        sx={{ mt: 2 }}
      >
        CERTIFICATE
      </Typography>
      <Typography variant="caption" align="center" display="block" color="gray">
        {recordData?.country +
          "-" +
          recordData?.state +
          "-" +
          recordData?.recordNo || "**-**-00000000"}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        fontWeight="bold"
        wrap
        color="#0e4173"
      >
        {recordData?.record_name || "Achievement details not available"}
      </Typography>
      <Typography variant="h6" align="center" fontWeight="bold" color="#0e4173">
        {recordData?.person_name || "Recipient Name"}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        fontWeight="bold"
        color="#0e4173"
      >
        achieved at an event organised by{" "}
        <span style={{ fontWeight: "bold" }}>"THE BOOK OF WORLD RECORD"</span>{" "}
        at {safe(getStateName(recordData?.country, recordData?.state))},{" "}
        {safe(getCountryName(recordData?.country))} held by{" "}
        <span style={{ fontWeight: "bold" }}>"IYA"</span> on{" "}
        {safe(formatDate(recordData?.date))}.
      </Typography>

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      >
        <img
          src="book-of-record-logo.png"
          alt="Book of World Record"
          style={{
            opacity: 0.3,
            width: "60px",
            height: "60px",
            borderRadius: "50%",
          }}
        />
      </Box>
      <Typography
        variant="body1"
        fontFamily='"ITC Avant Garde Gothic", sans-serif'
        align="center"
        fontSize="18px"
      >
        OFFICIALLY RECORDED
      </Typography>

      <Typography sx={{ fontSize: "10px", color: "gray", display: "block" }}>
        © TheBookOfWorldRecord Limited 2021. This certificate does not
        necessarily denote entry into any products distributed or owned by
        KnackHunt Limited and must not be reproduced without prior written
        permission of KnackHunt Limited or The Book of World Record.
      </Typography>
      <Typography
        variant="body2"
        fontWeight="bold"
        color="goldenrod"
        align="center"
      >
        www.thebookofworldrecord.com
      </Typography>
    </Box>
  );
}
