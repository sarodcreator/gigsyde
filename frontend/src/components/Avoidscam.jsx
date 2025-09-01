import React, { useEffect, useRef } from "react";
import "./ui/style/scams.css";
import { Button } from './ui/button';

const Images = [
  "https://upload.wikimedia.org/wikipedia/commons/6/67/NBC_logo_2022.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/40/Business_Insider_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/0c/CNBC_logo.svg",
];

const AvoidScams = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const cards = carousel.getElementsByClassName("scam-card");
    let currentIndex = 0;

    const showSlide = (index) => {
      if (index >= cards.length) currentIndex = 0;
      else if (index < 0) currentIndex = cards.length - 1;
      else currentIndex = index;

      const offset = -currentIndex * 100;
      carousel.style.transform = `translateX(${offset}%)`;
    };

    const nextSlide = () => showSlide(currentIndex + 1);
    const prevSlide = () => showSlide(currentIndex - 1);

    document.querySelector(".next-btn").addEventListener("click", nextSlide);
    document.querySelector(".prev-btn").addEventListener("click", prevSlide);

    // Cleanup event listeners
    return () => {
      document.querySelector(".next-btn")?.removeEventListener("click", nextSlide);
      document.querySelector(".prev-btn")?.removeEventListener("click", prevSlide);
    };
  }, []);

  const scamData = [
    { logo: Images[0], alt: "NBC", text: "People who turned to Upwork to find freelance gigs say they’ve lost thousands of dollars to scams." },
    { logo: Images[1], alt: "NBC", text: "Job switchers beware: Some high-paying, remote jobs are scams." },
    { logo: Images[2], alt: "NBC", text: "Many online job seekers face scams when looking for flexible opportunities." },
  ];

  return (
    <section className="scams-section">
      <h2 className="scams-title">
        Avoid Scams & Junk<br />we
        <span className="scamhighlight"> Verify 100%</span> of Our Job Listings
      </h2>

      <div className="carousel-wrapper">
        <button className="prev-btn">❮</button>
        <div className="scams-carousel" ref={carouselRef}>
          {scamData.map((item, index) => (
            <div className="scam-card" key={index}>
              <img src={item.logo} alt={item.alt} className="scam-logo" />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <button className="next-btn">❯</button>
      </div>
      <Button className='scamsBtn'  variant="outline" style={{ marginTop: '32px' }}>
        Find Scam-free jobs from anywhere in the world
      </Button>
    </section>
  );
};

export default AvoidScams;
