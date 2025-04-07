import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";

function MainLeft({children}){
    return (
        <div className="main">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src='book-of-record-logo.png'
                alt="Book of World Record"
                style={{
                  width: '100px',
                  height: '100px',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  border: '2px solid #a98c46',
                  padding: '2px',
                //   backgroundColor: 'white'
                }}
                onClick={() => Navigate('/')}
              />
            </Box>
            {children}
        </div>
    );
}

export default MainLeft;