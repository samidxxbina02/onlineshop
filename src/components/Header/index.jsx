import React, { useContext, useState } from "react";
import { leftSideIconsData } from "./helpers";
import { StyledHeader } from "./styled";
import "./Header.css";
import AppDropdown from "../UI/AppDropdown/AppDropdown";
import AuthHeader from "../AuthHeader";
import LiveSearch from "../LiveSearch";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext)

  const [searchActive, setSearchActive] = useState(false);


  const handleSearchIcon = () => {
    setSearchActive((prev) => !prev);
  };

  const navigationData = [
    {
        as: 'Главная',
        href:'/',
        admin: true
    },
    {
        as:'Добавить товар',
        href:'/admin',
        admin: JSON.parse(localStorage.getItem('user'))?.admin
    },
    {
        as:'О нас',
        href:'/about',
        admin: true
    },
   
    {
        as:'Связаться с нами',
        href:'/contacts',
        admin: true
    },
].filter(nav => !!nav.admin);

  return (
    <StyledHeader.Container>
      <StyledHeader.Top>
        <StyledHeader.LeftSideWrapper>
          {leftSideIconsData.map((icon, idx) => (
            <StyledHeader.Icon key={idx}>
              <StyledHeader.IconLink href={icon.href} target="_blank">
                {icon.as}
              </StyledHeader.IconLink>
            </StyledHeader.Icon>
          ))}
        </StyledHeader.LeftSideWrapper>
        <StyledHeader.LogoWrapper>
          <StyledHeader.LogoTop className="logo">BLVCK</StyledHeader.LogoTop>
          <StyledHeader.Logo>PARIS</StyledHeader.Logo>
        </StyledHeader.LogoWrapper>
        <StyledHeader.RightSideWrapper>
          <LiveSearch setSearchActive={setSearchActive} searchActive={searchActive} />
          <SearchIcon
            onClick={handleSearchIcon}
            sx={{ color: "white" }}
            fontSize="large"
          />
          {isAuth && (
            <StyledHeader.IconLink onClick={() => navigate("/shoppingCart")}>
              <ShoppingCartIcon sx={{ color: "white" }} fontSize="large" />
            </StyledHeader.IconLink>
          )}
          <AuthHeader />
        </StyledHeader.RightSideWrapper>
      </StyledHeader.Top>
      <StyledHeader.Line />
      <StyledHeader.NavList>
        {navigationData.map((item, idx) => (
          <StyledHeader.NavItem to={item.href} key={idx}>
            {item.as}
          </StyledHeader.NavItem>
        ))}
        <AppDropdown />
      </StyledHeader.NavList>
    </StyledHeader.Container>
  );
};

export default Header;
