// Trustees.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Trustees = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/externaljob/jobs");
        const data = await res.json();

        // Extract unique logos (filter out null/undefined)
        const extractedLogos = data
          .map((job) => job.company_logo)
          .filter((logo, index, self) => logo && self.indexOf(logo) === index);

        setLogos(extractedLogos);
      } catch (error) {
        console.error("Error fetching logos:", error);
      }
    };

    fetchLogos();
  }, []);

  return (
    <div style={{ overflow: "hidden", width: "100%", background: "#f9f9f9", padding: "20px 0" }}>
      <motion.div
        style={{ display: "flex", gap: "40px" }}
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {logos.concat(logos).map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="company logo"
            style={{ height: "60px", objectFit: "contain" }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Trustees;
