import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StoreProvider from "./context/store/StoreProvider";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/auth/AuthProvider";
import AppProvider from "./context/app/AppProvider";
import UserImportantListProvider from "./context/userImportantList/UserImportantListProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppProvider>
      <UserImportantListProvider>
        <AuthProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </AuthProvider>
      </UserImportantListProvider>
    </AppProvider>
    <ToastContainer />
  </BrowserRouter>
);
