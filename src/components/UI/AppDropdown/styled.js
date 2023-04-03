import { Link } from "react-router-dom";
import styled from "styled-components";

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownIcon = styled.div`
  cursor: pointer;
`;

export const DropdownOptions = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  padding: 5px;
`;

export const DropdownLinkOption = styled(Link)`
  cursor: pointer;
  width: 3rem;
  padding: 5px;
  &:hover {
    background-color: #eee;
  }
`;

export const DropdownOption = styled.div`
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: #eee;
  }
`;