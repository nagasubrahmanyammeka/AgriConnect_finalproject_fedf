import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";

export default function UserProfile() {
  const { user, loading: authLoading } = useAuth();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user || !user._id) {
      setError("User not logged in or invalid user data.");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:5000/api/users/${user._id}`)
      .then(res => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then(data => {
        setDetails(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load user details: " + err.message);
        setLoading(false);
      });
  }, [user, authLoading]);

  if (loading || authLoading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  if (!details) return null;

  const name = details.name || details.username || "Not provided";
  const role = details.role || "Full Stack Developer";
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
      {/* Left Card */}
      <div style={styles.leftCard}>
        <img src={defaultAvatar} alt="User Avatar" style={styles.avatar} />
        <h2 style={{ margin: "10px 0 5px" }}>{name}</h2>
        <p style={{ color: "#666", margin: "5px 0" }}>{role}</p>
        <p style={{ color: "#999" }}>{address}</p>
        <div style={{ marginTop: "10px" }}>
          <button style={styles.followBtn}>Follow</button>
          <button style={styles.messageBtn}>Message</button>
        </div>
      </div>
      {/* Right Card */}
      <div style={styles.rightCard}>
        <div style={styles.row}><label style={styles.label}>Full Name</label><span style={styles.value}>{name}</span></div>
        <div style={styles.row}><label style={styles.label}>Email</label><span style={styles.value}>{email}</span></div>
        <div style={styles.row}><label style={styles.label}>Phone</label><span style={styles.value}>{phone}</span></div>
        <div style={styles.row}><label style={styles.label}>Mobile</label><span style={styles.value}>{mobile}</span></div>
        <div style={styles.row}><label style={styles.label}>Address</label><span style={styles.value}>{address}</span></div>
        <div style={styles.row}><label style={styles.label}>Joined On</label><span style={styles.value}>{joinDate}</span></div>
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button style={styles.editBtn}>Edit</button>
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
  followBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 20px",
    marginRight: "8px",
    cursor: "pointer",
  },
  messageBtn: {
    backgroundColor: "#e9ecef",
    border: "none",
    borderRadius: "6px",
    padding: "8px 20px",
    cursor: "pointer",
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
  editBtn: {
    backgroundColor: "#17a2b8",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 25px",
    cursor: "pointer",
  },
};
