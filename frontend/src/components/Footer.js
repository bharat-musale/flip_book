import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#003366',
        color: 'white',
        py: 1.5, 
        mt: 'auto',
        position: 'relative', 
        zIndex: 1, 
        minHeight: '60px' 
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <img
            src="/book-of-record-logo.png"
            alt="Book of World Record"
            style={{
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              border: '2px solid #a98c46',
              padding: '2px',
              backgroundColor: 'white'
            }}
          />
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} The Book of World Record. All rights reserved.
          </Typography>
        </Box>
        <Box>
          {/* Right side contact button */}
          <Button 
            color="inherit" 
            onClick={() => Navigate('/contact')}
            sx={{
              backgroundColor: '#a98c46',
              '&:hover': {
                backgroundColor: '#c19a49'
              },
              borderRadius: '20px',
              padding: '8px 20px'
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
