import React, { useEffect, useState } from "react";
import axios from "axios";

const AllGuidance = () => {
  const [guidance, setGuidance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/guidance")
      .then((res) => {
        setGuidance(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch Guidance data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Guidance...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h2>All Guidance Provided by Experts</h2>
      {(!guidance || guidance.length === 0) && <p>No Guidance found!</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {guidance.map((item) => (
          <li
            key={item._id}
            style={{
              background: "#f9fafc",
              margin: "10px 0",
              borderRadius: 8,
              padding: "16px",
              boxShadow: "0 2px 7px rgba(0,0,0,0.06)",
            }}
          >
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Email:</strong> {item.email}
            </p>
            <p>
              <strong>Message:</strong> {item.message}
            </p>
            <br/>
            <p>Contact By: {item.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllGuidance;
