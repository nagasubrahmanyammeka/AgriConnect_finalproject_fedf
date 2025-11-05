import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Internal styles
  const styles = {
    navbar: {
      background: "linear-gradient(90deg, #276d2c, #2e8740)",
      padding: "12px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
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
      color: "white",
      gap: "10px",
    },
    logoImg: {
      height: "50px",
    },
    menu: {
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      gap: "32px",
      margin: 0,
      padding: 0,
    },
    link: {
      textDecoration: "none",
      fontSize: "1.1rem",
      fontWeight: 600,
      position: "relative",
      transition: "all 0.3s ease",
    },
    home: {
      color: "#f0f8ff",
    },
    shop: {
      color: "#fff8dc",
    },
    contact: {
      color: "#e6e6fa",
    },
    userButton: {
      background: "transparent",
      border: "2px solid white",
      color: "white",
      padding: "6px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "1rem",
      transition: "all 0.3s ease",
    },
    userButtonHover: {
      background: "white",
      color: "#2e8740",
    },
    button: {
      background: "transparent",
      border: "1px solid white",
      color: "white",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      transition: "all 0.3s ease",
    },
    buttonHover: {
      background: "white",
      color: "#2e8740",
    },
  };

  const [isUserBtnHovered, setUserBtnHovered] = React.useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <img src="/logo.png" alt="Logo" style={styles.logoImg} />
          <h1>AgriConnect</h1>
        </div>

        <ul style={styles.menu}>
          <li>
            <Link
              to="/"
              style={{ ...styles.link, ...styles.home }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/shop"
              style={{ ...styles.link, ...styles.shop }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Shop
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              style={{ ...styles.link, ...styles.contact }}
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
                    ...styles.userButton,
                    ...(isUserBtnHovered ? styles.userButtonHover : {}),
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
                  style={styles.button}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = styles.buttonHover.background;
                    e.currentTarget.style.color = styles.buttonHover.color;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = styles.button.background;
                    e.currentTarget.style.color = styles.button.color;
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
                  style={{ ...styles.button, textDecoration: "none", padding: "6px 14px" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = styles.buttonHover.background;
                    e.currentTarget.style.color = styles.buttonHover.color;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = styles.button.background;
                    e.currentTarget.style.color = styles.button.color;
                  }}
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  style={{
                    ...styles.button,
                    background: "#fff",
                    color: "#2e8740",
                    textDecoration: "none",
                    padding: "6px 14px",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#2e8740";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#fff";
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
