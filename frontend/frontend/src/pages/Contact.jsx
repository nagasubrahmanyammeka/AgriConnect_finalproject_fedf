import React, { useState } from "react";
import "../App.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted: " + JSON.stringify(formData));
  };

  return (
    <div className="page-container">
      
      <h2>Contact Us</h2>
      <center><h4>We’d love to hear from you!</h4></center>
      
      <center><p>Whether you’re a farmer, buyer, or agriculture enthusiast, feel free to reach out to us. Our team is always ready to assist you.</p></center>
      <br/>
      <h4>📍 Address:</h4>
      <p>AgriConnect Solutions Pvt.Ltd.</p>
      <p>123 Valley, Main Road, Vijayawada, 520004</p>
      <br/>
      <h4>📞 Phone:</h4>
      <p>+91 112233445</p>
      <br/>
      <h4>📧 Email:</h4>
      <p>support@agriconnect.com</p>
      <br/>
      <h4>🕒 Working Hours:</h4>
      <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
      <p>Sunday: Closed</p>
      <br/>
      <br/>

      <h3>Send Message:</h3>
      <br/>
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
            Comment/Message:
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
            />
          </label>
          <center>
            <button type="submit">Send</button>
          </center>
        </form>
      </fieldset>
    </div>
  );
};

export default Contact;
