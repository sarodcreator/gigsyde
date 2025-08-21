import React from "react";
import Slider from "react-slick";
import "./ui/style/scams.css";

const AvoidScams = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const scamData = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/NBC_logo_2022.svg",
      alt: "NBC",
      text: "People who turned to Upwork to find freelance gigs say they’ve lost thousands of dollars to scams."
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Business_Insider_Logo.svg",
      alt: "Business Insider",
      text: "Job switchers beware: Some high-paying, remote jobs are scams."
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/CNBC_logo.svg",
      alt: "CNBC",
      text: "Many online job seekers face scams when looking for flexible opportunities."
    }
  ];

  return (
    <section className="scams-section">
      <h2 className="scams-title">
        Avoid Scams & Junk <br />
        <span className="highlight">We Verify 100% of Our Job Listings</span>
      </h2>

      <Slider {...settings} className="scams-carousel">
        {scamData.map((item, index) => (
          <div className="scam-card" key={index}>
            <img src={item.logo} alt={item.alt} className="scam-logo" />
            <p>{item.text}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default AvoidScams;
