import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api.js";
import Card from "../components/Card.jsx";
import "../App.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="page-container">
      <h2>Products</h2>
      <div className="card-container">
        {products.map((product) => (
          <Card
            key={product._id}
            title={product.name}
            description={product.description}
            image={product.image || "../assets/logo.png"}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
