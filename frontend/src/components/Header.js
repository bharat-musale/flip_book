import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#003366', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/book-of-record-logo.png"
            alt="Book of World Record"
            style={{
              width: '70px',
              height: '70px',
              marginRight: '15px',
              cursor: 'pointer',
              borderRadius: '50%',
              border: '2px solid #a98c46',
              padding: '2px',
              backgroundColor: 'white'
            }}
            onClick={() => navigate('/')}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
