import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateContent = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file first!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("author", author);

    try {
      await axios.post("http://localhost:5000/api/content", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Content uploaded!");
      navigate("/all-content");
    } catch (error) {
      alert("Failed to upload: " + error.message);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: 600, margin: "40px auto", padding: 20, background: "#f4f6fa", borderRadius: 8, boxShadow: "0 2px 7px rgba(0,0,0,0.06)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Upload Content (PDF, DOCX, MP4, etc.)</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
          Author:
          <input 
            type="text" 
            value={author} 
            onChange={e => setAuthor(e.target.value)} 
            required 
            style={{ padding: "10px", borderRadius: 6, border: "1px solid #ddd" }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
          Short Description:
          <textarea 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            required 
            rows={3} 
            style={{ padding: "10px", borderRadius: 6, border: "1px solid #ddd" }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
          File:
          <input 
            type="file" 
            onChange={handleFileChange} 
            required 
            accept=".pdf,.docx,.txt,.mp4,.doc" 
            style={{ marginTop: 8 }}
          />
        </label>
        <button 
          type="submit" 
          style={{ 
            padding: "10px 24px", 
            borderRadius: 6, 
            border: "none", 
            backgroundColor: "#2a9d8f", 
            color: "white", 
            fontWeight: "bold", 
            cursor: "pointer",
            alignSelf: "center"
          }}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default CreateContent;
