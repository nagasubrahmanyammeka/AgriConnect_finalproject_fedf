import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    farmers: 0,
    experts: 0,
    publicUsers: 0
  });
  const [users, setUsers] = useState([]);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatsAndUsers();
  }, []);

  const fetchStatsAndUsers = async () => {
    try {
      console.log('🔵 Fetching dashboard data...');
      
      const statsRes = await axios.get("http://localhost:5000/api/admin/stats");
      console.log('✅ Stats:', statsRes.data);
      setStats(statsRes.data);
      
      const usersRes = await axios.get("http://localhost:5000/api/admin/users");
      console.log('✅ Users:', usersRes.data);
      setUsers(usersRes.data);
      
      setLoading(false);
    } catch (err) {
      console.error('❌ Dashboard error:', err);
      setError('Failed to load dashboard data. Make sure backend is running.');
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const userToDelete = users.find(u => u._id === userId);
    
    if (!window.confirm(
      `Are you sure you want to delete user "${userToDelete?.name || 'this user'}"?\n\n` +
      `Email: ${userToDelete?.email}\n` +
      `Role: ${userToDelete?.role}\n\n` +
      `This action cannot be undone!`
    )) {
      return;
    }

    setDeletingUserId(userId);
    
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      
      const deletedUser = users.find(u => u._id === userId);
      if (deletedUser) {
        setStats(prev => ({
          totalUsers: prev.totalUsers - 1,
          farmers: deletedUser.role === 'farmer' ? prev.farmers - 1 : prev.farmers,
          experts: deletedUser.role === 'expert' ? prev.experts - 1 : prev.experts,
          publicUsers: deletedUser.role === 'public' ? prev.publicUsers - 1 : prev.publicUsers,
        }));
      }

      alert(
        `✅ User Deleted Successfully!\n\n` +
        `Name: ${deletedUser?.name}\n` +
        `Email: ${deletedUser?.email}\n` +
        `Role: ${deletedUser?.role}`
      );
    } catch (error) {
      console.error('❌ Delete error:', error);
      alert(`❌ Failed to delete user!\n\nPlease try again.`);
    } finally {
      setDeletingUserId(null);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-bg">
        <div className="dashboard-card" style={{ textAlign: 'center', padding: '60px' }}>
          <h2>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-bg">
      <div className="dashboard-card">
        <h1 style={{ marginBottom: "6px" }}>Admin Dashboard</h1>
        <div style={{ color: "#d2ffd2", fontWeight: 400, marginBottom: "36px" }}>
          User Statistics Overview
        </div>

        {error && (
          <div className="alert alert-error">
            ⚠️ {error}
          </div>
        )}

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
                  <td colSpan="7" className="empty-state">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`status status--${user.role}`}>
                        {user.role}
                      </span>
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
                          cursor: deletingUserId === user._id ? 'not-allowed' : 'pointer',
                          opacity: deletingUserId === user._id ? 0.6 : 1
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

        <p style={{ marginTop: '30px', color: 'white' }}>
          See the All Feedbacks Submitted by the Users - 
          <button 
            className="btn btn--sm"
            style={{ marginTop: 20, marginLeft: 10 }}
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
