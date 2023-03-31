import React from "react";
import { leftSideIconsData, navigationData, rightSideIconsData } from "./helpers";
import { StyledHeader } from "./styled";
import "./Header.css";
import AppDropdown from "../UI/AppDropdown/AppDropdown";
import AuthHeader from "../AuthHeader";

const Header = () => {
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
          {rightSideIconsData.map((icon, idx) => (
            <StyledHeader.IconLink href={icon.href && icon.href} key={idx}>
              {icon.as}
            </StyledHeader.IconLink>
          ))}
          <AuthHeader />
        </StyledHeader.RightSideWrapper>
      </StyledHeader.Top>
      <StyledHeader.Line />
      <StyledHeader.NavList>
        {navigationData.map((item, idx) => (
          <StyledHeader.NavItem   to={item.href} key={idx}>
            {item.as}
          </StyledHeader.NavItem>
        ))}
        <AppDropdown />
      </StyledHeader.NavList>
    </StyledHeader.Container>
  );
};

export default Header;
