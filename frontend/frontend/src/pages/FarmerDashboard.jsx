import React from "react";
import { useNavigate } from "react-router-dom";

const videos = [
  {
    id: "R-5lywOVBhU",
    title: "Woman Excelling in Organic Farming | Praised by Modi",
    url: "https://www.youtube.com/watch?v=R-5lywOVBhU&t=153s",
  },
  {
    id: "mkEsLdNKlPM",
    title: "Organic Farming Techniques For Small Farms and Market",
    url: "https://www.youtube.com/watch?v=mkEsLdNKlPM&t=3s",
  },
  {
    id: "DrK9bm4jujs",
    title: "Vertical Farming, Amazing Modern Farming Technology",
    url: "https://www.youtube.com/watch?v=DrK9bm4jujs",
  },
  {
    id: "s2400030128s1",
    title: "How American Farmers Harvest 2.5 Million Pounds Of Sweet Potatoes by Machine | Farming Documentary",
    url: "https://www.youtube.com/watch?v=lf8Li2K0VaE",
  },
  {
    id: "s2400030128s2",
    title: "How multilayer farming made this farm profitable",
    url: "https://www.youtube.com/watch?v=c5pekMjAapo",
  }
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
    description:
      "Promotes organic farming through cluster approach and certification.",
  },
  {
    title:"PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    description:"Provides ₹6,000 per year as direct income support to small and marginal farmers, paid in three installments"
  },
  {
    title:"PMFBY (Pradhan Mantri Fasal Bima Yojana",
    description: "Offers crop insurance against natural calamities, pests, and diseases, with low premiums and broad coverage."
  },
  {
    title:"Kisan Credit Card (KCC) Scheme",
    description: "Enables farmers to get affordable short-term credit for crop production, equipment, and other needs."
  },
  {
    title:"Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)",
    description:"Boosts investment in agriculture and allied sectors; supports states in increasing productivity and farmer income."
  },
  {
    title:"Agriculture Infrastructure Fund (AIF)",
    description:"Offers loans at subsidized rates for setting up warehouses, cold storage, and processing units."
  },
  {
    title:"Dalhan Atmanirbharta Mission",
    description:"Another 2025 launch; aims to increase pulse production, strengthen the value chain, and empower farmers."
  }
];

export default function FarmerDashboard() {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate("/shop");
  };

  const buttonStyle = {
    backgroundColor: "#28723f",
    color: "white",
    border: "none",
    borderRadius: 10,
    padding: "14px 32px",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const handleButtonHover = (e) => {
    e.currentTarget.style.backgroundColor = "#1f572b";
  };

  const handleButtonLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#28723f";
  };

  const outerFieldsetStyle = {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 14,
    boxShadow: "0 5px 26px rgba(44,110,40,.08)",
    margin: 0,
    width: "95vw",
    maxWidth: "none",
  };

  return (
    <div
      style={{
        padding: 20,
        height: "100vh",
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
        Farmer Dashboard
      </h1>

      <fieldset style={outerFieldsetStyle}>
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ marginBottom: 14 }}>Advanced Agricultural Videos</h2>
          <ul style={{ paddingLeft: 0, margin: 0 }}>
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
                <strong style={{ fontSize: "1.15rem", color: "#21742e" }}>{title}</strong>
                <p style={{ marginTop: 8, color: "#405934", marginBottom: 0 }}>{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h1>Here is some Intersting Content about the Technologies</h1><br /><br />
          <h4>1. Precision Agriculture</h4>
          <p>Uses satellite data, sensors, and drones to monitor crops, soil, and weather.</p>
          <p>Helps farmers apply exact amounts of water, fertilizer, and pesticides only where needed.</p>
          <p>Increases yield while reducing cost and waste.</p><br />
          <h4>2. Hydroponics</h4>
          <p>Growing plants without soil, using nutrient-rich water solutions.</p>
          <p>Ideal for urban or indoor farming.</p>
          <p>Uses less water and space than traditional farming.</p><br />
          <h4>3. Vertical Farming</h4>
          <p>Crops are grown in stacked layers or shelves, often indoors under controlled conditions.</p>
          <p>Uses LED lighting and automation systems.</p>
          <p>Great for cities with limited land.</p><br />
          <h4>4. Drone Technology</h4>
          <p>Drones help in aerial surveying, crop health analysis, and precision spraying.</p>
          <p>Reduces manual labor and ensures faster, accurate monitoring.</p><br />
          <h4>5. Climate-Smart Agriculture</h4>
          <p>Adjusts farming practices based on climate patterns and forecasts.</p>
          <p>Includes drought-resistant crops, rainwater harvesting, and efficient irrigation.</p>
          <p>Reduces the impact of climate change on farming.</p>
        </section>

        <br />
        <br />

        <section style={{ textAlign: "center" }}>
          <h1>From here you can buy your Requirements With Quality</h1>
          <br />
          <button
            onClick={handleShopClick}
            style={buttonStyle}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Go to Shop
          </button>
        </section>
        <br />
        <br />

        <section>
          <h1>Inspirationtional Stories:</h1>
          <br />
          <h4>Subhash Palekar – The Zero Budget Natural Farming Pioneer (India)</h4>
          <p>Background: A farmer from Maharashtra, India, who realized that chemical farming was destroying soil fertility and increasing farmer debts.</p>
          <p>Achievement: Developed Zero Budget Natural Farming (ZBNF) — a method using local cow dung and urine instead of chemical fertilizers.</p>
          <p>Impact: Thousands of farmers adopted his techniques, reducing costs and improving soil health.</p>
          <p>Lesson: Sustainable practices can lead to both environmental and economic prosperity.</p>
          <br />
          <h4>Kalpana Saroj – From Poverty to Agro-Industry Leader</h4>
          <p>Background: Born into poverty and child marriage, Kalpana faced huge challenges early in life.</p>
          <p>Achievement: She became an entrepreneur, revitalizing Kamani Tubes Ltd., and later invested in agro-based industries that employ rural women.</p>
          <p>Impact: Created jobs and promoted women empowerment through agri-enterprises.</p>
          <p>Lesson: Resilience and determination can turn any setback into a comeback.</p>
          <br />
          <h4>Harishchandra Naik – The Mango King of Karnataka</h4>
          <p>Background: Once a small farmer, Naik began grafting different varieties of mangoes to create unique hybrids.</p>
          <p>Achievement: Developed over 100 mango varieties on his farm, some named after family members.</p>
          <p>Impact: His innovative grafting techniques attracted researchers and tourists from across India.</p>
          <p>Lesson: Innovation in traditional farming can create new opportunities and fame.</p>
          <br />
          <h4>Malvika Hegde – Reviving Café Coffee Day’s Farm-to-Cup Model</h4>
          <p>Background: After the sudden passing of CCD founder V.G. Siddhartha, his wife Malvika took over the company amidst financial crisis.</p>
          <p>Achievement: Strengthened direct relationships with coffee farmers and promoted sustainable sourcing.</p>
          <p>Impact: Helped stabilize thousands of coffee growers' livelihoods while keeping the business alive.</p>
          <p>Lesson: Leadership in tough times can revive hope for entire farming communities.</p>
          <br />
          <h4>Rajesh Aggarwal – Hydroponic Farming Innovator</h4>
          <p>Background: An engineer who quit his job to focus on modern agriculture.</p>
          <p>Achievement: Founded a hydroponic farm (soil-less farming using nutrient-rich water) producing leafy greens in urban settings.</p>
          <p>Impact: Demonstrated how technology and agriculture can blend to solve food scarcity and land issues.</p>
          <p>Lesson: Future farming lies in smart, sustainable innovation.</p>
        </section>

        <p>
          Click Here to See the Suggestions Provided by the Experts -{" "}
          <button
            style={buttonStyle}
            onClick={() => navigate("/all-guidance")}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            See Suggestions
          </button>
        </p>
        <br />
        <p>
          Click Here to See the Contents Assisted by the Experts -{" "}
          <button
            style={buttonStyle}
            onClick={() => navigate("/all-content")}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            View Contents
          </button>
        </p>
        <br />
        <p>
          To Submit Feedback About your Experience -{" "}
          <button
            style={buttonStyle}
            onClick={() => navigate("/feedback")}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Submit Feedback
          </button>
        </p>
        <br />
        <p>
          Click Here to Get Suggestions based on the pH Value -{" "}
          <button
            style={buttonStyle}
            onClick={() => navigate("/ph")}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Get pH Comments
          </button>
        </p>
      </fieldset>
    </div>
  );
}
