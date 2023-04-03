import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeader = {
  Container: styled.div`
    background-color: black;
    height: 150px;
  `,
  LeftSideWrapper: styled.ul`
    display: flex;
    gap: 1.5rem;
  `,
  Icon: styled.li``,
  IconLink: styled.a``,
  LogoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
  `,
  LogoTop: styled.span`
    font-size: 25px;
  `,
  Logo: styled.span`
    font-size: 10px;
    color: white; ;
  `,
  RightSideWrapper: styled.ul`
    position: relative;
    display: flex;
    gap: 1.5rem;
  `,
  NavList: styled.ul`
    display: flex;
    color: white;
    justify-content: center;
    font-family: 'Comfortaa', cursive;
    
  `,
  NavItem: styled(Link)`
    color: white;
    margin: 0 1rem;
    

    :hover {
      color: white;
      border-bottom: 0.5px solid white;
    }
  `,
  Line: styled.hr.attrs({
    size: 1
  })`
  `,
  Top: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60%;
    padding: 0 1.5rem;
    
  `,
};
