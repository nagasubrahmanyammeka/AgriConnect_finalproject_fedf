import React, { useState } from "react";

const products = [
  // Insecticides
  {
    id: 1,
    category: "Insecticides",
    name: "Contact Insecticide",
    desc: "Kills pests on contact. Immediate control for plant surfaces.",
    price: 300,
  },
  {
    id: 2,
    category: "Insecticides",
    name: "Systemic Insecticide",
    desc: "Absorbed into the plant for long-lasting protection.",
    price: 560,
  },
  {
    id: 3,
    category: "Insecticides",
    name: "Biological Insecticide",
    desc: "Environmentally-friendly, safe for beneficial insects.",
    price: 250,
  },

  // Farm Machinery
  {
    id: 4,
    category: "Farm Machinery",
    name: "Tractor 3000",
    desc: "Powerful tractor for heavy duty agricultural tasks.",
    price: 1500000,
  },
  {
    id: 5,
    category: "Farm Machinery",
    name: "Automatic Seeder",
    desc: "Accurate seed sowing equipment for various seeds.",
    price: 45000,
  },

  // Nutrients
  {
    id: 6,
    category: "Nutrients",
    name: "Nitrogen Fertilizer",
    desc: "High quality nitrogen fertilizer for better crop growth.",
    price: 1200,
  },
  {
    id: 7,
    category: "Nutrients",
    name: "Phosphorus Fertilizer",
    desc: "Premium phosphorus content to enrich soil.",
    price: 1500,
  },

  // Seeds
  {
    id: 8,
    category: "Seeds",
    name: "Wheat Seeds",
    desc: "High yield wheat seeds with disease resistance.",
    price: 250,
  },
  {
    id: 9,
    category: "Seeds",
    name: "Rice Seeds",
    desc: "Premium rice seeds for quality produce.",
    price: 300,
  },

  // Books
  {
    id: 10,
    category: "Books",
    name: "Modern Farming Techniques",
    desc: "Comprehensive guide to contemporary agriculture.",
    price: 400,
  },
  {
    id: 11,
    category: "Books",
    name: "Organic Farming",
    desc: "Principles and practices of organic agriculture.",
    price: 350,
  },

  // Gadgets
  {
    id: 12,
    category: "Gadgets",
    name: "Soil Moisture Sensor",
    desc: "Sensors for monitoring soil moisture levels.",
    price: 1200,
  },
  {
    id: 13,
    category: "Gadgets",
    name: "Weather Station",
    desc: "Accurate weather station for farm monitoring.",
    price: 2500,
  },
];

const cardStyle = {
  background: "#fff",
  borderRadius: 17,
  boxShadow: "0 6px 20px rgba(44,90,40,.15)",
  padding: "22px 20px 16px 20px",
  minWidth: 220,
  maxWidth: 280,
  margin: "17px",
  flex: "1 1 240px",
  display: "flex",
  flexDirection: "column",
};

const btnStyle = {
  border: "2px solid #28723f",
  borderRadius: 7,
  padding: "8px 0",
  color: "#28723f",
  background: "transparent",
  fontWeight: "600",
  fontSize: "1rem",
  marginTop: 16,
  cursor: "pointer",
  transition: "background 0.13s, color 0.13s",
};
const btnHoverStyle = { background: "#a3f0b0", color: "#18582d" };

export default function Shop() {
  const [cart, setCart] = useState([]);
  const [hovered, setHovered] = React.useState(-1);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ background: "#f3faf3", minHeight: "92vh", padding: "36px 0 54px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 14px" }}>
        <h1
          style={{
            textAlign: "center",
            color: "#267f34",
            marginBottom: 22,
            fontSize: "2.2rem",
            fontWeight: 700,
            letterSpacing: ".7px",
          }}
        >
          AgriConnect Shop
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "center",
          }}
        >
          {products.map((prod, i) => (
            <div key={prod.id} style={cardStyle}>
              <h3 style={{ color: "#227536", fontWeight: 600, marginBottom: 7, fontSize: "1.21rem" }}>
                {prod.name}
              </h3>
              <div style={{ color: "#213d23", fontSize: ".99rem", marginBottom: 6, fontWeight: 500 }}>
                {prod.desc}
              </div>
              <span style={{ fontWeight: "bold", fontSize: "1.12rem", color: "#237334", marginTop: 5 }}>
                ₹{prod.price}
              </span>
              <button
                style={{
                  ...btnStyle,
                  ...(hovered === i ? btnHoverStyle : {}),
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
                onClick={() => addToCart(prod)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div
          style={{
            maxWidth: 500,
            margin: "40px auto 0 auto",
            background: "white",
            borderRadius: 18,
            padding: 24,
            boxShadow: "0 5px 18px rgba(30, 80, 20, 0.15)",
          }}
        >
          <h2 style={{ color: "#285b23" }}>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Cart is empty.</p>
          ) : (
            <div>
              {cart.map(({ id, name, qty, price }) => (
                <div key={id} style={{ marginBottom: 10 }}>
                  {name} &times; {qty} = ₹{price * qty}
                </div>
              ))}
              <hr />
              <h3>Total Amount: ₹{totalAmount}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
