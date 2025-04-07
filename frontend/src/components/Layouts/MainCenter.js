import { Box, Button,  div,  TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function MainCenter({
  children,
  isSearch = false,
  isAdmin = false,
  onAdmin,
  openAddModal = false,
  onSearch,
  searchLoader,
}) {
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    onSearch(searchId);
    setLoading(searchLoader);
  };

  return (
    <div className="main-center" style={{ marginBottom: "20px" }}>
      {/* Search Box */}
      <Box
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "end",
          width: "100%",
        }}
      >
        {isSearch && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter Record ID (e.g., CERT001)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                size="small"
                sx={{
                  flexGrow: 1,
                  background: "#fff",
                  width: "40vw",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    "&:hover fieldset": {
                      borderColor: "#c19a49",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#003366",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  bgcolor: "#003366",
                  "&:hover": {
                    bgcolor: "#004d99",
                  },
                  borderRadius: 1,
                  minWidth: "100px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </Box>
            {error && (
              <Typography color="error" sx={{ textAlign: "center" }}>
                {error}
              </Typography>
            )}
          </Box>
        )}
        {isAdmin && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={onAdmin}
              disabled={loading}
              sx={{
                bgcolor: "#003366",
                "&:hover": {
                  bgcolor: "#004d99",
                },
                borderRadius: 1,
                minWidth: "100px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Add Record
            </Button>
          </Box>
        )}
      </Box>
      {children}
    </div>
  );
}

export default MainCenter;