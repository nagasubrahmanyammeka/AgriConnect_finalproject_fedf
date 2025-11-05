import React from "react";
import { Link } from "react-router-dom";// Use this for custom styles

const services = [
  {
    title: "Shop",
    description: "Browse and purchase high-quality seeds, fertilizers, agri-equipment and more at farmer-friendly prices.",
    icon: "🛒",
    link: "/shop"
  },
  {
    title: "Contact",
    description: "Get in touch with our AgriConnect team for personalized support or expert advice.",
    icon: "☎️",
    link: "/contact"
  },
  {
    title: "Schemes",
    description: "Explore latest government and institution schemes, subsidies, and benefits for farmers.",
    icon: "📑",
    link: "/schemes"
  },
  {
    title: "Devices",
    description: "See a range of smart devices and IoT technologies empowering modern agriculture.",
    icon: "🔌",
    link: "/devices"
  },
  {
    title: "Technologies",
    description: "Learn about new and emerging technologies advancing the field of agriculture.",
    icon: "💡",
    link: "/technologies"
  }
];

const Services = () => (
  <div className="services-bg">
    <h1 className="services-title">Our Services</h1>
    <div className="services-list">
      {services.map((srv) => (
        <Link className="service-block" to={srv.link} key={srv.title}>
          <span className="service-icon">{srv.icon}</span>
          <div>
            <h2>{srv.title}</h2>
            <p>{srv.description}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default Services;
