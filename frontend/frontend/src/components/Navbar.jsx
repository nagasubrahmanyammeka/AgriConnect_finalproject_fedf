import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isUserBtnHovered, setUserBtnHovered] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const styles = {
    navbar: {
      background: "linear-gradient(90deg, #276d2c, #2e8740)",
      padding: "12px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
    },
    logoImg: {
      height: "50px",
    },
    logoText: {
      color: "white",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    menu: {
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      gap: "32px",
      margin: 0,
      padding: 0,
    },
    link: (color) => ({
      color,
      textDecoration: "none",
      fontSize: "1.1rem",
      fontWeight: 600,
      transition: "color 0.3s, text-decoration 0.3s",
    }),
    button: (bg, color, border = true) => ({
      background: bg,
      color,
      border: border ? "1px solid white" : "none",
      padding: "6px 14px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "1rem",
      transition: "all 0.3s ease",
      textDecoration: "none",
    }),
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div
          style={styles.logoContainer}
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" alt="Logo" style={styles.logoImg} />
          <h1 style={styles.logoText}>AgriConnect</h1>
        </div>

        <ul style={styles.menu}>
          <li>
            <Link
              to="/"
              style={styles.link("#f0f8ff")}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/shop"
              style={styles.link("#fff8dc")}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Shop
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              style={styles.link("#e6e6fa")}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Contact
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <button
                  style={{
                    ...styles.button(
                      "transparent",
                      isUserBtnHovered ? "#2e8740" : "white"
                    ),
                    border: "2px solid white",
                    background: isUserBtnHovered ? "white" : "transparent",
                  }}
                  onMouseEnter={() => setUserBtnHovered(true)}
                  onMouseLeave={() => setUserBtnHovered(false)}
                  onClick={() => navigate("/profile")}
                >
                  {user.name}
                </button>
              </li>

              <li>
                <button
                  style={styles.button("transparent", "white")}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = "#2e8740";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "white";
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  style={styles.button("transparent", "white")}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = "#2e8740";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "white";
                  }}
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  style={styles.button("white", "#2e8740")}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#2e8740";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = "#2e8740";
                  }}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
