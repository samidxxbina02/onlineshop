import React, { useContext, useEffect } from "react";
import { StyledMainPage } from "../MainPage/styled";
import ProductList from "../../components/ProductList";
import { UserImportantListContext } from "../../context/userImportantList/UserImportantListContext";

const ShoppingCartPage = () => {
  const { userImportantList, getUserImportantList } = useContext(
    UserImportantListContext
  );

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id || null;

    if (userId) {
      getUserImportantList(userId);
    }
  }, []);

  return (
    <StyledMainPage.Container>
      <StyledMainPage.ProductListContainer>
        <ProductList products={userImportantList} />
      </StyledMainPage.ProductListContainer>
    </StyledMainPage.Container>
  );
};

export default ShoppingCartPage;
