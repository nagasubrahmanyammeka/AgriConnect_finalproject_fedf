import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import Farmers from "../pages/Farmers.jsx";
import Contact from "../pages/Contact.jsx";
import Services from "../pages/Services.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/farmers" element={<Farmers />} />
    <Route path="/contact" element={<Contact />} />
     <Route path="/services" element={<Services />} />
  </Routes>
);

export default AppRoutes;
