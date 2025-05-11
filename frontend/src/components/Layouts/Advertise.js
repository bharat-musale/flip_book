import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import "./style.css";

const AdvertiserService = (props) => {
  const { src, alt, imageArr, numberOfAdvertisers } = props;
  const [currentSrc, setCurrentSrc] = useState(
    src || (imageArr && imageArr[0])
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (imageArr && imageArr.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % imageArr.length;
          setCurrentSrc(imageArr[newIndex]);
          return newIndex;
        });
      }, 4000);

      return () => clearInterval(intervalId); // Clear interval on unmount
    }
  }, [imageArr]);

  return (
    <Paper className="advertise">
      <img
        src={currentSrc}
        alt={alt || "bookofworldrecord"}
        style={{ width: "250px", height: "300px" }}
      />
    </Paper>
  );
};

export default AdvertiserService;
