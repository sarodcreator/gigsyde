import React from "react";
import Slider from "react-slick";
import "./ui/style/scams.css";
import { Button } from './ui/button';
// import Logo1 from ''

let Images = [
  "https://upload.wikimedia.org/wikipedia/commons/6/67/NBC_logo_2022.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/40/Business_Insider_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/0c/CNBC_logo.svg",
]

const AvoidScams = () => {
  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
        autoplay: true,
        autoplaySpeed: 3000,
      }
    ]
  };

  const scamData = [
    {
      logo: Images[0],
      alt: "NBC",
      text: "People who turned to Upwork to find freelance gigs say they’ve lost thousands of dollars to scams."
    },
    {
      logo: Images[1],
      alt: "Business Insider",
      text: "Job switchers beware: Some high-paying, remote jobs are scams."
    },
    {
      logo: Images[2],
      alt: "CNBC",
      text: "Many online job seekers face scams when looking for flexible opportunities."
    }
  ];

  return (
    <section className="scams-section">
      <h2 className="scams-title">
        Avoid Scams & Junk<br />we
        <span className="scamhighlight"> Verify 100%</span> of Our Job Listings
      </h2>

      <Slider {...settings} className="scams-carousel">
        {scamData.map((item, index) => (
          <div className="scam-card" key={index}>
            <img src={item.logo} alt={item.alt} className="scam-logo" />
            <p>{item.text}</p>
          </div>
        ))}
      </Slider>
      <Button variant='outline' style= {{marginTop: '32px'}}>Find Scam-free jobs from anywhere in the world</Button>
    </section>
  );
};

// Custom Next Arrow
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px" }}
      onClick={onClick}
    />
  );
};

// Custom Prev Arrow
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: 1, }}
      onClick={onClick}
    />
  );
};

export default AvoidScams;
