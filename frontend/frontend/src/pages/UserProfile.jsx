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

      if (!user || !user._id) {
        setError("User not logged in. Redirecting to login...");
        setLoading(false);
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        
        console.log("Fetching user with ID:", user._id);
        console.log("Token exists:", !!token);

        if (!token) {
          setError("No authentication token found. Please login again.");
          setLoading(false);
          setTimeout(() => {
            logout();
            navigate("/login");
          }, 2000);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log("Response status:", response.status);

        if (response.status === 401) {
          // Token expired or invalid
          setError("Session expired. Please login again.");
          setLoading(false);
          setTimeout(() => {
            logout();
            navigate("/login");
          }, 2000);
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User data received:", data);
        
        setDetails(data);
        setError("");
      } catch (err) {
        console.error("Fetch error:", err);
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

  const name = details.name || details.username || "Not provided";
  const role = details.role || "User";
  const email = details.email || "Not provided";
  const phone = details.phone || "Not provided";
  const mobile = details.mobile || phone;
  const address = details.address || details.location || "Not provided";
  
  let joinDate = "Not provided";
  if (details.createdAt) {
    const dt = new Date(details.createdAt);
    joinDate = isNaN(dt.getTime()) ? "Not provided" : dt.toLocaleDateString();
  }

  return (
    <div style={styles.container}>
      <div style={styles.leftCard}>
        <img src={defaultAvatar} alt="User Avatar" style={styles.avatar} />
        <h2 style={{ margin: "10px 0 5px" }}>{name}</h2>
        <p style={{ color: "#666", margin: "5px 0", textTransform: "capitalize" }}>{role}</p>
        <p style={{ color: "#999" }}>{address}</p>
      </div>
      
      <div style={styles.rightCard}>
        <div style={styles.row}>
          <label style={styles.label}>Full Name</label>
          <span style={styles.value}>{name}</span>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Email</label>
          <span style={styles.value}>{email}</span>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Role</label>
          <span style={styles.value} style={{textTransform: "capitalize"}}>{role}</span>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Phone</label>
          <span style={styles.value}>{phone}</span>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Mobile</label>
          <span style={styles.value}>{mobile}</span>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Address</label>
          <span style={styles.value}>{address}</span>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Joined On</label>
          <span style={styles.value}>{joinDate}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    maxWidth: "800px",
    margin: "50px auto",
  },
  leftCard: {
    width: "40%",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    padding: "30px",
    borderRight: "1px solid #ddd",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  rightCard: {
    width: "60%",
    padding: "30px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    color: "#555",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "1.2rem",
  },
  error: {
    color: "red",
    textAlign: "center",
    padding: "40px",
  },
  retryBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
