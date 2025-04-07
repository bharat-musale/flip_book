import { Box } from "@mui/material";
import Certificate from "../Certificate";

export default function renderRightPage ({recordData}){
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
            <Certificate recordData={recordData || {}} />
          </Box>
        </Box>
      );
}