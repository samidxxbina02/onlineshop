import React, { useRef, useState } from "react";

import {
  DropdownWrapper,
  DropdownIcon,
  DropdownOptions,
  DropdownOption,
  DropdownLinkOption,
} from "./styled";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

const AppDropdown = ({ options, icon }) => {
  const dropdownRef = useRef()
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    event.preventDefault()
    setIsOpen(!isOpen);
  };

  useOnClickOutside(dropdownRef, () => {
    setIsOpen(false)
  })

  const handleItemClick = (event, option) => {
    event.stopPropagation()
    event.preventDefault()
    option.onClick && option.onClick()
  }

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownIcon onClick={toggleDropdown}>{icon}</DropdownIcon>
      {isOpen && (
        <DropdownOptions>
          {options.map((option, idx) => {
            return option.href ? (
              <DropdownLinkOption key={option.label} to={option.href}>
                {option.label}
              </DropdownLinkOption>
            ) : (   
              <DropdownOption
                key={option.label}
                onClick={(event) => handleItemClick(event, option)}
              >
                {option.label}
              </DropdownOption>
            );
          })}
        </DropdownOptions>
      )}
    </DropdownWrapper>
  );
};

export default AppDropdown;
