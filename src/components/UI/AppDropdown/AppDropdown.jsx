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

  return (
    <DropdownWrapper>
      <DropdownIcon onClick={toggleDropdown}>{icon}</DropdownIcon>
      {isOpen && (
        <DropdownOptions>
          {options.map((option) => {
            return option.href ? (
              <DropdownLinkOption key={option} to={option.href}>
                {option.label}
              </DropdownLinkOption>
            ) : (
              <DropdownOption
                key={option}
                onClick={option.onClick && option.onClick()}
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
