import React, { useState } from "react";
import { leftSideIconsData, navigationData } from "./helpers";
import { StyledHeader } from "./styled";
import "./Header.css";
import AppDropdown from "../UI/AppDropdown/AppDropdown";
import AuthHeader from "../AuthHeader";
import LiveSearch from "../LiveSearch";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchIcon = () => {
    setSearchActive((prev) => !prev);
  };

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
          <LiveSearch searchActive={searchActive} />
          <SearchIcon
            onClick={handleSearchIcon}
            sx={{ color: "white" }}
            fontSize="large"
          />
          <StyledHeader.IconLink href="/cart">
              <ShoppingCartIcon sx={{ color: "white" }} fontSize="large" />
            </StyledHeader.IconLink>
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
