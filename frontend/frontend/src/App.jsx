import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import PublicDashboard from "./pages/PublicDashboard";
import ExpertDashboard from "./pages/ExpertDashboard";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Services from "./pages/Services";
import UserProfile from "./components/UserProfile";
import Feedback from "./pages/Feedback";
import AllFeedbacks from "./pages/AllFeedbacks";
import Guidance from "./pages/Guidance";
import AllGuidance from "./pages/AllGuidance";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateContent from './pages/CreateContent';
import AllContent from './pages/AllContent';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main style={{ minHeight: "80vh", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />

            {/* User profile */}
            <Route path="/profile" element={<UserProfile />} />

            {/* Guidance Routes */}
            <Route path="/guidance" element={<Guidance />} />
            <Route path="/all-guidance" element={<AllGuidance />} />
            {/*Create Content*/}
            <Route path="/create-content" element={<CreateContent />} />
            <Route path="/all-content" element={<AllContent />} />

            {/* Feedback Routes */}
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/all-feedbacks" element={<AllFeedbacks />} />
            {/*Profile Page*/}

            {/* Dashboards */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farmer"
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/public"
              element={
                <ProtectedRoute allowedRoles={["public"]}>
                  <PublicDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expert"
              element={
                <ProtectedRoute allowedRoles={["expert"]}>
                  <ExpertDashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-All */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
