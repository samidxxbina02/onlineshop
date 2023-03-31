import React from "react";
import ProductList from "../../components/ProductList";
import ProductsPagination from "../../components/ProductsPagination";
import Slider from "../../components/UI/Slider/Slider";
import { StyledMainPage } from "./styled";

const MainPage = () => {
  return (
    <StyledMainPage.Container>
      <StyledMainPage.SliderContainer>
        <Slider />
      </StyledMainPage.SliderContainer>
      <StyledMainPage.ProductListContainer>
        <ProductList />
      </StyledMainPage.ProductListContainer>
      <ProductsPagination />
    </StyledMainPage.Container>
  );
};

export default MainPage;