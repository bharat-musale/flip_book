import React, { useState, useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {  certificatesApis, IMAGE_BASE_URL } from '../services/api';
import ErrorBoundary from './ErrorBoundary';
import DashboardLayout from './Layouts/DashboardLayout';
import DashboardLayoutAdt from './Layouts/DashboardLayoutAdt';
import Certificate from './Layouts/Certificate';
import DynamicModal from './Layouts/DynamicModal';
import renderCoverPage from './Layouts/BookPage/CoverPage';
import renderLeftPage from './Layouts/BookPage/LeftPage';
import renderEmptyPage from './Layouts/BookPage/EmptyPage';
import renderRightPage from './Layouts/BookPage/RightPage';

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      {props.children}
    </div>
  );
});

const BookView = () => {
  const [searchId, setSearchId] = useState('');
  const [foundRecord, setFoundRecord] = useState({
    recordNo: "12345", // Example record number
    issuedTo: "John Doe", // Example name
    text: "This is the official certificate text, confirming the achievement.", // Example certificate text
  });
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAutoFlipping, setIsAutoFlipping] = useState(false);
  
  const bookRef = useRef();
  const bookContainerRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isSignedUp = location.state?.isSignedUp || localStorage.getItem('token');
  const user = location.state?.user;

  const scrollToBook = () => {
    if (bookContainerRef.current) {
      bookContainerRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const playFlipSound = () => {
    const audio = new Audio('/sounds/page-flip.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await certificatesApis.previewByRecordNo(searchId);
      setFoundRecord(response.data.data.certificate);
      setShowSearchResult(true);
      
      // Sequence of animations
      if (bookRef.current) {
        setIsFlipping(true);
        setIsAutoFlipping(true);  // Set auto-flipping flag
        
        // 1. Scroll to the book
        scrollToBook();
        
        // 2. Start page flipping sequence after scroll
        setTimeout(() => {
          // First flip
          bookRef.current.pageFlip().flip(1);
          playFlipSound();
          
          // Second flip after a delay
          setTimeout(() => {
            bookRef.current.pageFlip().flip(2);
            playFlipSound();
            setTimeout(() => {
              setIsFlipping(false);
              setIsAutoFlipping(false);  // Reset auto-flipping flag
            }, 1000);
          }, 800);
        }, 500);
      }
    } catch (err) {
      setError('Certificate not found. Please check the record number.');
      setShowSearchResult(false);
      setFoundRecord(null);
      setIsAutoFlipping(false);  // Reset flag in case of error
    } finally {
      setLoading(false);
    }
  };

  const handleViewFullDetails = async () => {
    try {
      const response = await certificatesApis.getByRecordNo(searchId);
      setFoundRecord({
        ...foundRecord,
        text: response.data.data.certificate.text,
        certificateImage: response.data.data.certificate.certificateImage
      });
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login', { state: { recordData: foundRecord } });
      } else {
        setError('Error loading full certificate details.');
      }
    }
  };

  // Handle page flipping events
  const onFlip = (e) => {
    if (!isAutoFlipping) {  // Only play sound for manual flips
      playFlipSound();
    }
  };

  return (
    <DashboardLayoutAdt  >
      {/* <DashboardLayout> */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          pb: 10, // Add padding at bottom
          mt: 3,
        }}
      >
        {/* Search Box */}
        {/* <Paper elevation={3} sx={{ 
            mb: 4, 
            p: 2,
            borderRadius: 2,
            width: '100%',
            maxWidth: 500,
            mx: 'auto',
            background: '#fff',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: '1px solid #c19a49',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)'
            }
          }}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <Box sx={{ 
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Record ID (e.g., CERT001)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  size="small"
                  sx={{
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      '&:hover fieldset': {
                        borderColor: '#c19a49',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#003366',
                      }
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  onClick={handleSearch}
                  disabled={loading}
                  sx={{
                    bgcolor: '#003366',
                    '&:hover': {
                      bgcolor: '#004d99'
                    },
                    borderRadius: 1,
                    minWidth: '100px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {loading ? 'Searching...' : 'Search'}
                </Button>
                {isSignedUp && (
                  <Button 
                    variant="outlined" 
                    onClick={handleLogout}
                    sx={{
                      borderColor: '#003366',
                      color: '#003366',
                      '&:hover': {
                        borderColor: '#004d99',
                        bgcolor: 'rgba(0,51,102,0.05)'
                      },
                      borderRadius: 1,
                      minWidth: '100px'
                    }}
                  >
                    Logout
                  </Button>
                )}
              </Box>
              {error && (
                <Typography color="error" sx={{ textAlign: 'center' }}>
                  {error}
                </Typography>
              )}
            </Box>
          </Paper> */}

        {/* Flip Book */}
        <ErrorBoundary>
          <Box
            ref={bookContainerRef}
            sx={{
              width: "100%",
              maxWidth: 1000,
              mx: "auto",
              aspectRatio: "1.5",
              scrollMarginTop: "2rem",
              "& > div": {
                "&:first-of-type": {
                  width: "100% !important",
                },
              },
              "& .page": {
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                },
              },
            }}
          >
            <HTMLFlipBook
              width={600}
              height={800}
              size="stretch"
              minWidth={400}
              maxWidth={1000}
              minHeight={500}
              maxHeight={1533}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              ref={bookRef}
              className="flip-book"
              onFlip={onFlip}
              flippingTime={1000}
              useMouseEvents={true}
              startPage={0}
              drawShadow={true}
              autoSize={true}
              clickEventForward={false}
              usePortrait={false}
              startZIndex={0}
              style={{ perspective: "1500px" }}
            >
              {/* Cover Page */}
              <Page number={1}>{renderCoverPage()}</Page>

              {/* Left Page - Text and Button */}
              <Page number={2}>
                {(showSearchResult && foundRecord) || true
                  ? renderLeftPage(navigate, foundRecord, isSignedUp,recordData)
                  : renderEmptyPage()}
              </Page>

              {/* Right Page - Certificate Image */}
              <Page number={3}>
                {(showSearchResult && foundRecord) || true
                  ? renderRightPage(recordData)
                  : renderEmptyPage()}
              </Page>
            </HTMLFlipBook>
          </Box>
        </ErrorBoundary>
      </Box>
      {/* </DashboardLayout> */}
    </DashboardLayoutAdt>
  );
};

export default BookView;
export const recordData = {
  certificateId: "USA-NYC-90027",
  achievement: "Longest time breath held voluntarily 18 minutes 05.47 seconds (female)",
  recipient: "JANE WRITER",
  eventDetails: 'Achieved at an event organised by "THE BOOK OF WORLD RECORD" at Rockland County, New Square, New York held by "IYA" on June 21, 2024.',
};
