import React, { useContext, useEffect } from "react";
import ProductList from "../../components/ProductList";
import ProductsPagination from "../../components/ProductsPagination";
import Slider from "../../components/UI/Slider/Slider";
import { StyledMainPage } from "./styled";
import { StoreContext } from "../../context/store/StoreContext";

const MainPage = () => {
  const { getProductsRequest, productsPending, products } =
  useContext(StoreContext);

  useEffect(() => {
    getProductsRequest();
  }, [])

  return (
    <StyledMainPage.Container>
      <StyledMainPage.ProductListContainer>
        <ProductList products={products} productsPending={productsPending}/>
      </StyledMainPage.ProductListContainer>
      <ProductsPagination />
      {/* <StyledMainPage.SliderContainer>
        <Slider />
      </StyledMainPage.SliderContainer> */}
    </StyledMainPage.Container>
  );
};

export default MainPage;
