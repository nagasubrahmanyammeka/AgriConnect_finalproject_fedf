import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  // Initialize authentication from localStorage
  const initializeAuth = async () => {
    try {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken) {
        // Set token in state and axios headers
        setToken(savedToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

        // Verify token with backend
        try {
          const res = await axios.get(`${API_URL}/auth/me`);
          if (res.data) {
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
          }
        } catch (error) {
          console.error("Token verification failed:", error.message);
          // Clear invalid session
          clearAuth();
        }
      } else if (savedUser) {
        // Fallback: load user from localStorage if only user data exists
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token: jwtToken, user: userData } = res.data;

      // Save to localStorage
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("user", JSON.stringify(userData));

      // Set axios default header
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

      // Update state
      setToken(jwtToken);
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  // Register function
  const register = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, data);
      const { token: jwtToken, user: userData } = res.data;

      // Save to localStorage
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("user", JSON.stringify(userData));

      // Set axios default header
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

      // Update state
      setToken(jwtToken);
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed. Please try again.",
      };
    }
  };

  // Logout function
  const logout = () => {
    clearAuth();
  };

  // Clear authentication state
  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
