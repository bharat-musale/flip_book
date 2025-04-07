import { Box, Button } from "@mui/material";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function MainRight({ children }) {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth(); 

  return (
    <div className="main">
      <div className="main-right">
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            height: "100px",
          }}
        >
        { user && <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            sx={{
              borderColor: "#003366",
              color: "#003366",
              "&:hover": {
                borderColor: "#004d99",
                bgcolor: "rgba(0,51,102,0.05)",
              },
              borderRadius: 1,
              minWidth: "100px",
            }}
          >
            Logout
          </Button>}
        </Box>
        {children}
      </div>
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        modalTitle="Logout"
        modalSubtitle="Are you sure you want to logout?"
        primaryAction={{
          label: "Logout",
          onClick: logout,
        }}
      />
    </div>
  );
}

export default MainRight;
