import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const videos = [
  { id: "R-5lywOVBhU",
    title: "Woman Excelling in Organic Farming | Praised by Modi",
    url: "https://www.youtube.com/watch?v=R-5lywOVBhU&t=153s",
  },
  { id: "mkEsLdNKlPM",
    title: "Organic Farming Techniques For Small Farms and Market",
    url: "https://www.youtube.com/watch?v=mkEsLdNKlPM&t=3s",
  },
  { id: "DrK9bm4jujs",
    title: "Vertical Farming, Amazing Modern Farming Technology",
    url: "https://www.youtube.com/watch?v=DrK9bm4jujs",
  },
  { id: "s2400030128s1",
    title:
      "How American Farmers Harvest 2.5 Million Pounds Of Sweet Potatoes by Machine | Farming Documentary",
    url: "https://www.youtube.com/watch?v=lf8Li2K0VaE",
  },
  { id: "s2400030128s2",
    title: "How multilayer farming made this farm profitable",
    url: "https://www.youtube.com/watch?v=c5pekMjAapo",
  },
];

const schemes = [
  {
    title: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
    description:
      "Aims to improve irrigation efficiency and expand coverage for farmers across India.",
  },
  {
    title: "Soil Health Card Scheme",
    description:
      "Provides farmers with regular soil testing and nutrient advisory services.",
  },
  {
    title: "Paramparagat Krishi Vikas Yojana (PKVY)",
    description: "Promotes organic farming through cluster approach and certification.",
  },
  {
    title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    description:
      "Provides ₹6,000 per year as direct income support to small and marginal farmers, paid in three installments.",
  },
  {
    title: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    description:
      "Offers crop insurance against natural calamities, pests, and diseases, with low premiums and broad coverage.",
  },
  {
    title: "Kisan Credit Card (KCC) Scheme",
    description:
      "Enables farmers to get affordable short-term credit for crop production, equipment, and other needs.",
  },
  {
    title: "Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)",
    description:
      "Boosts investment in agriculture and allied sectors; supports states in increasing productivity and farmer income.",
  },
  {
    title: "Agriculture Infrastructure Fund (AIF)",
    description:
      "Offers loans at subsidized rates for setting up warehouses, cold storage, and processing units.",
  },
  {
    title: "Dalhan Atmanirbharta Mission",
    description:
      "Aims to increase pulse production, strengthen the value chain, and empower farmers.",
  },
];

const outerFieldsetStyle = {
  backgroundColor: "white",
  padding: 30,
  borderRadius: 14,
  boxShadow: "0 5px 26px rgba(44,110,40,.08)",
  margin: "0 auto",
  maxWidth: 900,
};

// same shell as Farmer dashboard
const DashboardLayout = ({ title, subtitle, children }) => (
  <div className="dashboard-bg">
    <div className="dashboard-card">
      <header style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: 6 }}>{title}</h1>
        {subtitle && (
          <p style={{ color: "#c8f4d0", margin: 0 }}>{subtitle}</p>
        )}
      </header>
      {children}
    </div>
  </div>
);

const PublicDashboard = () => {
  const navigate = useNavigate();
  const [techniques, setTechniques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechniques = async () => {
      try {
        const res = await axios.get(`${API_URL}/farmer/techniques`);
        setTechniques(res.data || []);
      } catch (error) {
        alert("Failed to load techniques");
      } finally {
        setLoading(false);
      }
    };
    fetchTechniques();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout
      title="Public Dashboard"
      subtitle="Explore modern techniques, schemes, stories and resources."
    >
      <div
        style={{
          padding: 10,
          color: "#184022",
          fontFamily: "Arial, sans-serif",
          background: "transparent",
        }}
      >
        <fieldset style={outerFieldsetStyle}>
          {/* Modern Farming Techniques */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ marginBottom: 17 }}>Modern Farming Techniques</h2>
            {techniques.map((t) => (
              <div
                key={t._id || t.id}
                style={{
                  boxShadow: "0 3px 10px rgba(39, 124, 37, 0.09)",
                  padding: 18,
                  borderRadius: 12,
                  marginBottom: 16,
                  backgroundColor: "#f6faf6",
                }}
              >
                <h3 style={{ color: "#21742e" }}>{t.title}</h3>
                <p style={{ color: "#405934" }}>{t.description}</p>
                {Array.isArray(t.benefits) && (
                  <ul>
                    {t.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          {/* Videos */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ marginBottom: 14 }}>Advanced Agricultural Videos</h2>
            <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
              {videos.map(({ id, title, url }) => (
                <li key={id} style={{ marginBottom: 13 }}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#21742e", fontSize: "1.1rem" }}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Schemes */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ marginBottom: 17 }}>Key Government Schemes</h2>
            <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
              {schemes.map(({ title, description }) => (
                <li
                  key={title}
                  style={{
                    boxShadow: "0 3px 10px rgba(39, 124, 37, 0.09)",
                    padding: 18,
                    borderRadius: 12,
                    marginBottom: 16,
                    backgroundColor: "#f6faf6",
                  }}
                >
                  <strong
                    style={{ fontSize: "1.15rem", color: "#21742e" }}
                  >
                    {title}
                  </strong>
                  <p
                    style={{
                      marginTop: 8,
                      color: "#405934",
                      marginBottom: 0,
                    }}
                  >
                    {description}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Stories */}
          <section style={{ marginBottom: 36 }}>
            <h1>Inspirational Stories</h1>
            <br />
            {/* ... your story paragraphs unchanged ... */}
          </section>

          {/* Shop CTA */}
          <section style={{ textAlign: "center" }}>
            <h1>From here you can buy your Requirements With Quality👇</h1>
            <button
              type="button"
              onClick={() => navigate("/shop")}
              style={{
                backgroundColor: "#28723f",
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "14px 32px",
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1f572b";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#28723f";
              }}
            >
              Go to Shop
            </button>
          </section>

          <br />
          <br />

          {/* Links */}
          <section>
            <p>
              Click Here to See the Suggestions Provided by the Experts –{" "}
              <button
                type="button"
                style={{ marginTop: 20, padding: "10px 16px", cursor: "pointer" }}
                onClick={() => navigate("/all-guidance")}
              >
                See Suggestions
              </button>
            </p>
            <p>
              Click Here to See the Contents Assisted by the Experts –{" "}
              <button
                type="button"
                style={{ marginTop: 20, padding: "10px 16px", cursor: "pointer" }}
                onClick={() => navigate("/all-content")}
              >
                View Contents
              </button>
            </p>
            <p>
              To Submit Feedback About your Experience –{" "}
              <button
                type="button"
                style={{ marginTop: 20, padding: "10px 16px", cursor: "pointer" }}
                onClick={() => navigate("/feedback")}
              >
                Submit Feedback
              </button>
            </p>
          </section>
        </fieldset>
      </div>
    </DashboardLayout>
  );
};

export default PublicDashboard;
