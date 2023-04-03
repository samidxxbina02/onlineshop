import React, { useState } from "react";

import {
  DropdownWrapper,
  DropdownIcon,
  DropdownOptions,
  DropdownOption,
  DropdownLinkOption,
} from "./styled";

const AppDropdown = ({ options, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    event.preventDefault()
    setIsOpen(!isOpen);
  };


  const handleItemClick = (event, option) => {
    event.stopPropagation()
    event.preventDefault()
    option.onClick && option.onClick()
  }

  return (
    <DropdownWrapper>
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
