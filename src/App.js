import React, { useContext, useEffect } from "react";
import AppRouter from "./context/router/AppRouter";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth/AuthContext";

const redirectedPage = ["/admin", "/product-edit", "/shoppingCart"];
// const redirectedPage = []

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { initAuth, userLikes } = useContext(AuthContext)

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.admin) {
      if (redirectedPage.some((page) => pathname?.includes(page))) {
        navigate("/");
      }
    } else if (!user) {
      if (redirectedPage.some((page) => pathname?.includes(page))) {
        navigate("/");
      }
    }
  }, [user, pathname]);


  useEffect(() => {
    initAuth(user?.id)  
  }, [])


  return <AppRouter />;
};

export default App;
