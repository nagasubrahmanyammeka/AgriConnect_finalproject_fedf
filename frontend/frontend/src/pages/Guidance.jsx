import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Guidance = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/guidance", formData);
      alert("Guidance submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Failed to submit guidance: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Submit Educational Guidance</h2>
      <fieldset>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Message:
            <textarea
              name="message"
              placeholder="Your educational content, advice, or guidance"
              value={formData.message}
              onChange={handleChange}
              required
              rows={10}
            />
          </label>
          <center>
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Guidance"}
            </button>
          </center>
        </form>
      </fieldset>
    </div>
  );
};

export default Guidance;
