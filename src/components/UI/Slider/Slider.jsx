import React, { useState } from "react";
import "./Slider.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const images = [
  "https://i.pinimg.com/564x/36/67/5a/36675a16ef5d6452ec45128d75fcaacf.jpg",
  "https://i.pinimg.com/564x/ac/ed/e5/acede541a54bbeb919616cee9e08a90a.jpg",
  "https://i.pinimg.com/564x/65/ec/4e/65ec4e96ae4ace71f6c1a5be7bb8facb.jpg",
  "https://i.pinimg.com/564x/65/ec/4e/65ec4e96ae4ace71f6c1a5be7bb8facb.jpg",
  "https://i.pinimg.com/564x/3a/aa/1d/3aaa1da63a32d8edc204775ed5230831.jpg",
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((index + 1) % images.length);
  };

  return (
    <div className="container">
      <button className="btn" onClick={handlePrev}><ArrowBackIosIcon/></button>
      <img src={images[index]} alt={`Slide ${index}`} />
      <button className="btn" onClick={handleNext}><ArrowForwardIosIcon/></button>
    </div>
  );
};

export default Slider;
