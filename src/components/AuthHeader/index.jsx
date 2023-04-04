import React, { useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppDropdown from "../UI/AppDropdown/AppDropdown";
import { StoreContext } from "../../context/store/StoreContext";
import { AuthContext } from "../../context/auth/AuthContext";

const AuthHeader = () => {
  const { isAuth, logOut } = useContext(AuthContext)

  const authPopupItem = isAuth ? {
    onClick: () => {
      logOut()
    },
    label: "LogOut",
  } : {
    href: "/auth",
      label: "Login",
  }

  const authHeaderPopupList = [
    authPopupItem
  ]

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
