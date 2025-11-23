import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import Farmers from "../pages/Farmers.jsx";
import Contact from "../pages/Contact.jsx";
import Services from "../pages/Services.jsx";
import UserProfile from "../pages/UserProfile.jsx"; 
import Login from "../pages/Login.jsx";             
import Register from "../pages/Register.jsx";       

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/farmers" element={<Farmers />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/services" element={<Services />} />

    {/* Auth routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* User Profile route */}
    <Route path="/profile" element={<UserProfile />} />

    {/* Optionally, add a fallback route for 404 pages */}
    {/* <Route path="*" element={<NotFoundPage />} /> */}
  </Routes>
);

export default AppRoutes;
