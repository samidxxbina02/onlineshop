import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppDropdown from "../UI/AppDropdown/AppDropdown";

const authHeaderPopupList = [
    {
        href: '/auth',
        label: 'Login',
    }
]

const AuthHeader = () => {
  return (
    <li>
      <AppDropdown
        icon={<AccountCircleIcon sx={{ color: "white" }} fontSize="large" />}
        options={authHeaderPopupList}
      />
    </li>
  );
};

export default AuthHeader;
