import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledSlider } from "./styled";

const images = [
  "https://i.pinimg.com/564x/ea/b6/7e/eab67ece9097b07905ec4185292748c2.jpg",
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
    <StyledSlider.Wrapper>
      <StyledSlider.Btn onClick={handlePrev}>
        <ArrowBackIosIcon />
      </StyledSlider.Btn>
      <img src={images[index]} alt={`Slide ${index}`} />
      <StyledSlider.Btn onClick={handleNext}>
        <ArrowForwardIosIcon />
      </StyledSlider.Btn>
    </StyledSlider.Wrapper>
  );
};

export default Slider;
