import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";

export default function UserProfile() {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (authLoading) return;
      if (!user) {
        setError("User not logged in. Redirecting to login...");
        setLoading(false);
        setTimeout(() => navigate("/login"), 1500);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please login again.");
          setLoading(false);
          setTimeout(() => {
            logout();
            navigate("/login");
          }, 1500);
          return;
        }
        const response = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 401) {
          setError("Session expired. Please login again.");
          setLoading(false);
          setTimeout(() => {
            logout();
            navigate("/login");
          }, 1500);
          return;
        }
        if (!response.ok) throw new Error("Failed to fetch profile.");
        const data = await response.json();
        setDetails(data.user);
        setError("");
      } catch (err) {
        setError(`Failed to load user details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [user, authLoading, navigate, logout]);

  if (loading || authLoading) {
    return <div style={styles.loading}>Loading profile...</div>;
  }
  if (error) {
    return (
      <div style={styles.error}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/login")} style={styles.retryBtn}>
          Go to Login
        </button>
      </div>
    );
  }
  if (!details) return null;

  const name = details.name || "";
  const email = details.email || "";
  const phone = details.phone || "";
  const location = details.location || "";
  const role = details.role || "";

  // Role-based dashboard navigation
 function handleDashboard() {
  const roleClean = role.trim().toLowerCase();
  if (roleClean === "farmer") {
    navigate("/farmer");
  } else if (roleClean === "public") {
    navigate("/public");
  } else if (roleClean === "admin") {
    navigate("/admin");
  } else if (roleClean === "expert") {
    navigate("/expert");
  } else {
    navigate("/");
  }
}


  return (
    <div style={styles.pageBg}>
      <div style={styles.card}>
        <div style={styles.profileHeading}>Profile</div>
        <div style={{ textAlign: "center", margin: "26px 0 18px 0" }}>
          <img
            src={details.profileImage || defaultAvatar}
            alt="User Avatar"
            style={styles.avatar}
          />
          <div style={styles.name}>{name}</div>
          <div style={styles.role}>
            {role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}
          </div>
        </div>
        <div style={styles.fieldGroup}>
          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Full Name</label>
            <input disabled style={styles.input} value={name} placeholder="Full Name" />
          </div>
          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Email</label>
            <input disabled style={styles.input} value={email} placeholder="Email" />
          </div>
          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Phone</label>
            <input disabled style={styles.input} value={phone} placeholder="Phone" />
          </div>
          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Location</label>
            <input disabled style={styles.input} value={location} placeholder="Location" />
          </div>
          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Role</label>
            <input disabled style={styles.input} value={role ? role.charAt(0).toUpperCase() + role.slice(1) : ''} placeholder="Role" />
          </div>
        </div>
        <button style={styles.dashboardBtn} onClick={handleDashboard}>
          Go To Dashboard
        </button>
      </div>
    </div>
  );
}

const styles = {
 /* pageBg: {
    minHeight: "calc(100vh - 80px)",
    background: "#fafaf6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },*/
  card: {
    position:"fixed",
    left: "500px",
    background: "#fff",
    borderRadius: "16px",
    width: "750px",
    boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
    padding: "32px 32px 32px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  profileHeading: {
    fontWeight: "bold",
    fontSize: "1.45rem",
    color: "#153518",
    marginBottom: "7px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    margin: "8px auto 7px auto",
    display: "block",
  },
  name: {
    fontSize: "1.13rem",
    fontWeight: "bold",
    color: "#226147",
    marginTop: "8px",
    textAlign: "center",
  },
  role: {
    color: "#8da886",
    fontSize: "1.04rem",
    marginBottom: "5px",
    textAlign: "center",
  },
  fieldGroup: {
    marginTop: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  inputLabel: {
    width: "120px",
    minWidth: "120px",
    fontWeight: "500",
    color: "#153518",
    fontSize: "1rem",
    textAlign: "left",
  },
  input: {
    flex: 1,
    fontSize: "1.04rem",
    padding: "10px 12px",
    borderRadius: "7px",
    border: "1px solid #eaeaea",
    background: "#f6f6f6",
    color: "#55786e",
    outline: "none",
    marginBottom: "0",
  },
  loading: { textAlign: "center", padding: "40px", fontSize: "1.2rem" },
  error: { color: "red", textAlign: "center", padding: "40px" },
  retryBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  dashboardBtn: {
    margin: "18px 0 0 0",
    padding: "12px 24px",
    background: "#27a844",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    width: "80%",
  },
};
