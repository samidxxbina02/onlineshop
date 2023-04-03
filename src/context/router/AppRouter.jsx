import React from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import OnlyHeaderLayout from "../../layouts/OnlyHeaderLayout";
import WithoutSidebarLayout from "../../layouts/WithoutSidebarLayout";
import AdminPage from "../../pages/AdminPage/AdminPage";
import MainPage from "../../pages/MainPage/MainPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import ProductDetailsPage from "../../pages/ProductDetailsPage/ProductDetailsPage";
import AuthPage from "../../pages/AuthPage/AuthPage";
import ContactUs from "../../pages/ContactUs/ContactUs";

function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route element={<WithoutSidebarLayout />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/contacts" element={<ContactUs />} />
      </Route>
      <Route element={<OnlyHeaderLayout />}>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/auth" element={<AuthPage />} />
      
      </Route>
    </Routes>
  );
}

export default AppRouter;
