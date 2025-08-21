import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Trustees = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    // Static list of company names (replace with your desired companies)
    const companies = [
      "Google",
      "Microsoft",
      "Amazon",
      "Apple",
      "Facebook",
      "Netflix",
      "Tesla",
      "IBM",
      "Oracle",
      "Salesforce",
      "Adobe",
      "Intel",
      "Cisco",
      "Nvidia",
      "Uber",
      "Airbnb",
      "Spotify",
      "Shopify",
      "Twilio",
      "Zoom",
    ].slice(0, 20); // Limit to 20

    const fetchLogos = async () => {
      try {
        const logoPromises = companies.map(async (company) => {
          try {
            // Infer domain from company name (simple approach)
            const domain = company.toLowerCase().replace(/\s+/g, '') + ".com";
            const logoUrl = `https://logo.clearbit.com/${encodeURIComponent(domain)}`;

            // Pre-fetch to check if the logo exists (optional optimization)
            const response = await fetch(logoUrl, { method: "HEAD" });
            if (response.ok) {
              return logoUrl;
            } else {
              return `https://via.placeholder.com/150?text=${encodeURIComponent(company)}`; // Fallback
            }
          } catch (error) {
            console.error(`Error fetching logo for ${company}:`, error);
            return `https://via.placeholder.com/150?text=${encodeURIComponent(company)}`; // Fallback
          }
        });

        const logoUrls = await Promise.all(logoPromises);
        setLogos(logoUrls.filter(logo => logo)); // Filter out any undefined logos
      } catch (error) {
        console.error("Error fetching logos:", error);
      }
    };

    fetchLogos();
  }, []);

  return (
	  <div style={{ display: "flex",  width: "100%", gap: "0", background: "#f9f9f9", alignItems: "center" }}>
	  <div style={{ padding: "24px", width:"15%", backgroundImage: "linear-gradient(90deg, #ff3c00, #f9f9f9" }}>
	  <h2 style={{ color: "#fcfcfc", fontSize: "24px", fontFamily: "Arial, sans-serif" }}>Top Companies</h2>
	  </div>
    <div style={{ overflow: "hidden", width: "85%", background: "transparent", padding: "24px 0" }}>
      <motion.div
        style={{ display: "flex", gap: "80px" }}
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        {logos.concat(logos).map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="company logo"
            style={{ height: "48px", objectFit: "contain" }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ))}
      </motion.div>
    </div>
	  </div>
  );
};

export default Trustees;
