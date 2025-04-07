const { Typography, Box } = require("@mui/material");

export default function renderCoverPage (){
 return (<Box
    sx={{
      p: 3,
      height: "100%",
      width: "100%",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "8px double #c19a49",
    }}
  >
    <Box
      sx={{
        mb: 4,
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        border: "3px solid #c19a49",
        overflow: "hidden",
      }}
    >
      <img
        src="/book-of-record-logo.png"
        alt="Book of World Record"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "50%",
        }}
      />
    </Box>
    <Typography
      variant="h3"
      sx={{
        mb: 3,
        mt: 4,
        fontWeight: "bold",
        textAlign: "center",
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        color: "#003366",
      }}
    >
      The Book of <br />
      World Record
    </Typography>
  </Box>)
};
