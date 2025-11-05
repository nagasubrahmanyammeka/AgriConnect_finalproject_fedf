import React from "react";
import "../App.css";

const Card = ({ title, description, image }) => (
  <div className="card">
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default Card;
