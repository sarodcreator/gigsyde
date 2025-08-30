import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './ui/style/hero.css';

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
	  <div className='trustedcompanies' style={{ display: "flex",  flexDirection: "column", width: "100%", gap: "0", background: "#f9f9f9", boxSizing: 'border-box', alignItems: "center", padding: "40px 100px 80px" }}>
	  <div className='companiescontainer' style={{ padding: "24px", width:"100%", }}>
	  <h2 className='trustedCompaniesheader' style={{ color: "#00455aff", fontSize: "32px", textAlign: "center", fontFamily: "Arial, sans-serif", fontWeight: "700" }}>Top Companies hiring remote jobs</h2>
	  </div>
    <div className='trustedslide' style={{ overflow: "hidden", width: "100%", background: "transparent", padding: "0" }}>
      <motion.div
        style={{ display: "flex", gap: "80px" }}
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className='companiesAnimation'
      >
        {logos.concat(logos).map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="company logo"
            style={{ height: "48px", objectFit: "contain" }}
            onError={(e) => { e.target.style.display = 'none'; }}
            className="companiesLogos"
          />
        ))}
      </motion.div>
    </div>
	  </div>
  );
};

export default Trustees;
