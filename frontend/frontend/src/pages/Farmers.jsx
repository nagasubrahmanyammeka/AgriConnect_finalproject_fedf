import React, { useEffect, useState } from "react";
import { getFarmers } from "../api/api.js";
import Card from "../components/Card.jsx";
import "../App.css";

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      const data = await getFarmers();
      setFarmers(data);
    };
    fetchFarmers();
  }, []);

  return (
    <div className="page-container">
      <h2>Farmers</h2>
      <div className="card-container">
        {farmers.map((farmer) => (
          <Card
            key={farmer._id}
            title={farmer.name}
            description={farmer.location}
            image={farmer.image || "../assets/logo.png"}
          />
        ))}
      </div>
    </div>
  );
};

export default Farmers;
