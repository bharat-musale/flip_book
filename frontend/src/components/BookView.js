import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { certificatesApis } from "../services/api";
import ErrorBoundary from "./ErrorBoundary";
import DashboardLayoutAdt from "./Layouts/DashboardLayoutAdt";
import renderCoverPage from "./Layouts/BookPage/CoverPage";
import renderLeftPage from "./Layouts/BookPage/LeftPage";
import renderEmptyPage from "./Layouts/BookPage/EmptyPage";
import renderRightPage from "./Layouts/BookPage/RightPage";
import { useAuth } from "../context/AuthContext";
import LeftPage from "./Layouts/BookPage/LeftPage";
import RightPage from "./Layouts/BookPage/RightPage";
import EmptyPage from "./Layouts/BookPage/EmptyPage";
import DashboardLayout from "./Layouts/DashboardLayout";

const Page = React.forwardRef((props, ref) => (
  <div className="page" ref={ref}>
    {props.children}
  </div>
));

const BookView = () => {
  const [recordData, setRecordData] = useState({
    recordNo: "",
    issuedTo: "",
    text: "",
  });
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAutoFlipping, setIsAutoFlipping] = useState(false);
  const [emptyPageError,setEmptyPageError]=useState('')

  const bookRef = useRef();
  const bookContainerRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isSignedUp =
    location.state?.isSignedUp || localStorage.getItem("token");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      console.log(window.innerWidth);
      if (window.innerWidth < 1400) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

const LayoutComponent = !isMobile ? DashboardLayoutAdt : DashboardLayout;
console.log(isMobile);
  useEffect(() => {
    const fetchCertificate = async () => {
      if (user?.role === "user") {
        try {
          const response = await certificatesApis.getCertificateByMail({
            email: user?.email,
          });
          console.log(response?.data?.certificates);
          setRecordData(response?.data?.certificates[0]);
        } catch (error) {
          setError(error.message);
          setRecordData(null);
          console.error("Failed to fetch certificate:", error);
        }
      }
    };
    console.log(recordData)
    fetchCertificate();
  }, [user]);


  const scrollToBook = () => {
    if (bookContainerRef.current) {
      bookContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const playFlipSound = () => {
    const audio = new Audio("/sounds/page-flip.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const handleSearch = async (searchId) => {
    setLoading(true);
    setError(null);
    console.log(searchId)
    try {
      const response = await certificatesApis.previewByRecordNo({recordNo:searchId});
      console.log(response);
      setRecordData(response.data.certificate[0]);
      setShowSearchResult(true);

      if (bookRef.current) {
        setIsFlipping(true);
        setIsAutoFlipping(true);
        scrollToBook();

        setTimeout(() => {
          bookRef.current.pageFlip().flip(1);
          playFlipSound();
          setTimeout(() => {
            bookRef.current.pageFlip().flip(2);
            playFlipSound();
            setTimeout(() => {
              setIsFlipping(false);
              setIsAutoFlipping(false);
            }, 1000);
          }, 800);
        }, 500);
      }
    } catch (err) {
      console.log(err);
      setEmptyPageError("Certificate not found. Please check the record number.");
      setShowSearchResult(false);
      setRecordData(null);
      setIsAutoFlipping(false);
    } finally {
      setLoading(false);
    }
  };

  const handleViewFullDetails = async (searchId) => {
    try {
      const response = (await certificatesApis.getByRecordNo(searchId));
      setRecordData({
        ...recordData,
        text: response.data.data.certificate.text,
        certificateImage: response.data.data.certificate.certificateImage,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login", { state: { recordData } });
      } else {
        setError("Error loading full certificate details.");
      }
    }
  };

  const onFlip = () => {
    if (!isAutoFlipping) {
      playFlipSound();
    }
  };

  return (
    <LayoutComponent onSearch={(searchId)=>{handleSearch(searchId)}} isMobile={isMobile}>
      <Box
        sx={{
          // minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          pb: 10,
          mt: 3,
        }}
      >
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
              <Page number={1}>{renderCoverPage()}</Page>

              <Page number={2}>
                {console.log(recordData)}
                {recordData ? (
                  // renderLeftPage(recordData, isSignedUp)
                  <LeftPage recordData={recordData} isSignedUp={isSignedUp} />
                ) : (
                  // renderEmptyPage(emptyPageError)
                  <EmptyPage error={emptyPageError} />
                )}
              </Page>

              <Page number={3}>
                {recordData ? (
                  //  renderRightPage(recordData, isSignedUp)
                  <RightPage
                    recordData={recordData}
                    isSignedUp={isSignedUp}
                    download={isSignedUp}
                  />
                ) : (
                  renderEmptyPage(emptyPageError)
                )}
              </Page>
            </HTMLFlipBook>
          </Box>
        </ErrorBoundary>
      </Box>
    </LayoutComponent>
  );
};

export default BookView;
