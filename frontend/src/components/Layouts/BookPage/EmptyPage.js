import { Box, Typography } from "@mui/material";

export default function EmptyPage ({error}) {
  console.log(error);
     return (
       <Box
         sx={{
           p: 3,
           height: "100%",
           width: "100%",
           background: "#fff",
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           justifyContent: "center",
           border: "1px solid #ddd",
         }}
       >
         <Typography
           variant="body1"
           sx={{ color: "#666", textAlign: "center" , wordWrap: "break-word",width:"87%"}}
         >
           {error ?? "Search  for a certificate to view its details"}
         </Typography>
       </Box>
     );
}