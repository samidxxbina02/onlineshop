import React, { useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppDropdown from "../UI/AppDropdown/AppDropdown";
import { StoreContext } from "../../context/store/StoreContext";

const AuthHeader = () => {

  const authHeaderPopupList = [
    {
      href: "/auth",
      label: "Login",
    }
  ];

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
