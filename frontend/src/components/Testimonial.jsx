import React from "react";
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard";
import "./ui/style/testimonial.css";

// Unsplash profile image links (placeholders)
import Image1 from "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200";
import Image2 from "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200";
import Image3 from "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200";
import Image4 from "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200";
import Image5 from "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200";
import Image6 from "https://images.unsplash.com/photo-1503467913725-848e6ef8c1e5?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200";
import Image7 from "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200";

const testimonials = [
  {
    name: "Hollie T.",
    role: "Hired at CVS Health",
    text: "I preferred FlexJobs over other job sites because FlexJobs had resources for resume development.",
    rating: 4.6,
    img: Image1,
  },
  {
    name: "John Doe",
    role: "Hired at Tech Corp",
    text: "FlexJobs made finding a remote job so much easier with its verified listings.",
    rating: 4.5,
    img: Image2,
  },
  {
    name: "Jane Smith",
    role: "Hired at Marketing Inc",
    text: "The support and job resources were top-notch, highly recommend!",
    rating: 4.7,
    img: Image3,
  },
  {
    name: "Michael Lee",
    role: "Hired at Design Studio",
    text: "Great platform for flexible work opportunities, saved me a lot of time.",
    rating: 4.4,
    img: Image4,
  },
  {
    name: "Sarah Johnson",
    role: "Hired at Health Services",
    text: "I found my dream job thanks to the detailed job descriptions.",
    rating: 4.8,
    img: Image5,
  },
  {
    name: "Robert Brown",
    role: "Hired at EduTech",
    text: "The resume tools helped me land an interview within a week!",
    rating: 4.6,
    img: Image6,
  },
  {
    name: "Emily Davis",
    role: "Hired at Finance Firm",
    text: "A reliable site with no scams, perfect for job seekers.",
    rating: 4.5,
    img: Image7,
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
          autoplay: true, // Autoplay on mobile
          autoplaySpeed: 3000, // 3 seconds per slide
        },
      },
      {
        breakpoint: 1024, // Tablet and above
        settings: {
          slidesToShow: 1,
          autoplay: false, // No autoplay on larger screens
        },
      },
    ],
  };

  return (
    <div className="testimonials-section">
      <h2>What Our Members Are Saying</h2>
      <div className="rating">4.6 ★★★★★ + 14,000 Reviews</div>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </Slider>
    </div>
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
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

export default Testimonials;
