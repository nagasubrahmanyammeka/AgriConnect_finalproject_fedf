import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PhComment() {
  const [phValue, setPhValue] = useState("");
  const [comment, setComment] = useState("");
  const [cropSuggestions, setCropSuggestions] = useState([]);

  const getCommentForPh = (ph) => {
  if (ph < 0 || ph > 14) return "Please enter a valid pH value between 0 and 14.";
  if (ph < 5.5)
    return "The soil is very acidic. This can harm most plants. Consider adding lime to make it less acidic.";
  if (ph >= 5.5 && ph < 6.5)
    return "The soil is slightly acidic. Some crops grow well in this soil.";
  if (ph >= 6.5 && ph <= 7.5)
    return "The soil is neutral, which is ideal for most crops.";
  if (ph > 7.5 && ph <= 8.5)
    return "The soil is slightly alkaline. Some plants may find it harder to get nutrients.";
  if (ph > 8.5)
    return "The soil is strongly alkaline. You may need to add organic matter or sulfur to lower the pH.";
  return "";
};


  const getCropSuggestions = (ph) => {
    if (ph < 5.5) {
      return ["Blueberries", "Potatoes", "Rice", "Azaleas"];
    } else if (ph >= 5.5 && ph < 6.5) {
      return ["Wheat", "Barley", "Maize (corn)"];
    } else if (ph >= 6.5 && ph <= 7.5) {
      return ["Tomatoes", "Beans", "Carrots", "Peppers"];
    } else if (ph > 7.5 && ph <= 8.5) {
      return ["Beets", "Spinach", "Cabbage"];
    } else if (ph > 8.5) {
      return ["Asparagus", "Cilantro", "Lima beans"];
    } else {
      return [];
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPhValue(value);

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setComment(getCommentForPh(numValue));
      setCropSuggestions(getCropSuggestions(numValue));
    } else {
      setComment("");
      setCropSuggestions([]);
    }
  };

  const containerStyle = {
    background: "white",
    borderRadius: 14,
    boxShadow: "0 5px 26px rgba(44,110,40,0.08)",
    padding: "30px 28px",
    maxWidth: 520,
    margin: "0 auto 24px auto",
    fontFamily: "Arial, sans-serif",
    color: "#184022",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 8,
    fontWeight: 600,
    fontSize: "1rem",
    color: "#3d8b3f",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 10,
    border: "1.5px solid #aadbb8",
    fontSize: 16,
    marginBottom: 16,
    outline: "none",
    transition: "border-color 0.3s",
  };

  const commentLabelStyle = {
    fontWeight: 600,
    fontSize: "1rem",
    marginBottom: 6,
    marginTop: 12,
    color: "#3d8b3f",
  };

  const commentStyle = {
    background: "#f6faf6",
    borderRadius: 10,
    padding: 16,
    fontWeight: 600,
    color: "#2e7d32",
    boxShadow: "inset 0 2px 6px rgba(46, 125, 50, 0.15)",
    minHeight: 48,
    marginBottom: 20,
  };

  const cropListStyle = {
    listStyle: "disc",
    paddingLeft: 20,
    color: "#184022",
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      <label htmlFor="phInput" style={labelStyle}>
        Enter pH Value (0-14):
      </label>
      <input
        id="phInput"
        type="number"
        step="0.1"
        min="0"
        max="14"
        value={phValue}
        onChange={handleInputChange}
        style={inputStyle}
      />
      {comment && (
        <>
          <div style={commentLabelStyle}>Comment:</div>
          <div style={commentStyle}>{comment}</div>
        </>
      )}
      {cropSuggestions.length > 0 && (
        <>
          <div style={commentLabelStyle}>Suitable Crops for this pH:</div>
          <ul style={cropListStyle}>
            {cropSuggestions.map((crop) => (
              <li key={crop}>{crop}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function FarmerDashboard() {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate("/shop");
  };

  const outerFieldsetStyle = {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 18,
    boxShadow: "0 8px 32px rgba(44,110,40,0.12)",
    margin: "40px auto",
    width: "90vw",
    maxWidth: 1100,
    display: "block",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        color: "#184022",
        fontFamily: "Arial, sans-serif",
        background: "none",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 34, fontWeight: "bold" }}>
      Get pH Comments
      </h1>

      <fieldset style={outerFieldsetStyle}>
        <PhComment />
        {/* Existing sections for videos, schemes, content, stories */}
        {/* Add your sections here as before */}
        
        {/* ...other sections */}
        
        
        {/* More content here if needed */}
      </fieldset>
    </div>
  );
}
