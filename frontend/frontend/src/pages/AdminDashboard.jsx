import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Add this import

const AdminDashboard = () => {
  const navigate = useNavigate(); // Add this line

  const [stats, setStats] = useState({
    totalUsers: 0,
    farmers: 0,
    experts: 0,
    publicUsers: 0
  });
  const [users, setUsers] = useState([]);
  const [deletingUserId, setDeletingUserId] = useState(null);

  useEffect(() => {
    fetchStatsAndUsers();
    // eslint-disable-next-line
  }, []);

  const fetchStatsAndUsers = async () => {
    // Replace URL with your actual API endpoint:
    const statsRes = await axios.get("http://localhost:5000/api/admin/stats");
    setStats(statsRes.data);
    const usersRes = await axios.get("http://localhost:5000/api/admin/users");
    setUsers(usersRes.data);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    setDeletingUserId(userId);
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      alert("Failed to delete user.");
    }
    setDeletingUserId(null);
  };

  return (
    <div className="dashboard-bg">
      <div className="dashboard-card">
        <h1 style={{ marginBottom: "6px" }}>Admin Dashboard</h1>
        <div style={{ color: "#d2ffd2", fontWeight: 400, marginBottom: "36px" }}>User Statistics Overview</div>
        <div className="stats-grid" style={{ marginBottom: "34px" }}>
          <div className="stat-card">
            <h3>Total Users</h3>
            <div className="stat-number">{stats.totalUsers}</div>
          </div>
          <div className="stat-card">
            <h3>Farmers</h3>
            <div className="stat-number">{stats.farmers}</div>
          </div>
          <div className="stat-card">
            <h3>Experts</h3>
            <div className="stat-number">{stats.experts}</div>
          </div>
          <div className="stat-card">
            <h3>Public Users</h3>
            <div className="stat-number">{stats.publicUsers}</div>
          </div>
        </div>

        <h2 style={{ margin: "22px 0 15px 0" }}>All Users</h2>
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ color: "#888", textAlign: "center" }}>No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`status status--${user.role}`}>{user.role}</span>
                    </td>
                    <td>{user.phone}</td>
                    <td>{user.location}</td>
                    <td>
                      <button
                        style={{
                          background: "#cf2323",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 14px",
                          cursor: "pointer"
                        }}
                        onClick={() => handleDelete(user._id)}
                        disabled={deletingUserId === user._id}
                      >
                        {deletingUserId === user._id ? "..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p>
          See the All Feedbacks Submitted by the Users - 
          <button 
            style={{ marginTop: 20, padding: "10px 16px", cursor: "pointer" }}
            onClick={() => navigate("/all-feedbacks")}
          >
            See Feedbacks
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
