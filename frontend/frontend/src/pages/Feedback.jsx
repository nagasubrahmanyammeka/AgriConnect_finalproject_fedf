import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", formData);
      alert("Feedback submitted successfully!");
      navigate("/"); // Redirect after submission
    } catch (error) {
      alert("Failed to submit feedback: " + error.message);
    }
  };

  return (
    <div className="page-container">
      <h2>Submit Feedback</h2>
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
              placeholder="Your Feedback"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
            />
          </label>

          <center>
            <button type="submit">Submit Feedback</button>
          </center>
        </form>
      </fieldset>
    </div>
  );
};

export default Feedback;
