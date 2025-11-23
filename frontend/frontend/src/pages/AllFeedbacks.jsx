import React, { useEffect, useState } from "react";
import axios from "axios";

function AllFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/feedback")
      .then((res) => {
        setFeedbacks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch feedbacks");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading feedbacks...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>All Feedbacks</h2>
      {(!feedbacks || feedbacks.length === 0) && <p>No feedbacks found!</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {feedbacks.map((fb) => (
          <li
            key={fb._id}
            style={{
              background: "#f4f6fa",
              margin: "10px 0",
              borderRadius: 8,
              padding: "16px",
              boxShadow: "0 2px 7px rgba(0,0,0,0.06)",
            }}
          >
            <span><strong>Name:</strong> {fb.name}</span> <br />
            <span><strong>Email ID: </strong>{fb.email}</span> <br />
            <span><strong>Comment: </strong>{fb.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllFeedbacks;