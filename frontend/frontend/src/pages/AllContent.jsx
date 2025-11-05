import React, { useEffect, useState } from "react";
import axios from "axios";

const AllContent = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/content")
      .then((res) => {
        setContents(res.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading content...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>All Uploaded Content</h2>
      {!contents.length && <p>No content yet!</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {contents.map(item => (
          <li key={item._id} style={{
            background: "#f8fafd", margin: "10px 0", borderRadius: 8, padding: "16px",
            boxShadow: "0 2px 7px rgba(0,0,0,0.06)" }}>
            <strong>{item.originalname}</strong> <br />
            <span>Author: {item.author}</span> <br />
            <span>Description: {item.description}</span> <br />
            <a href={`http://localhost:5000/${item.filepath}`} download={item.originalname}>Download/View</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllContent;
