import React from "react";
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ui/style/testimonial.css";

const testimonials = [
  {
    author: "drealitachi",
    text: "The cosmetician isn’t just about enhancing beauty, but crafting confidence.",
  },
  {
    author: "intriguedmonkey",
    text: "In the realm of care, my doctor here isn’t just a practitioner; they’re a guardian of health.",
  },
  {
    author: "jane doe",
    text: "Trust isn’t given; it’s earned. And my surgeon here didn’t just earn my trust, but my admiration.",
  },
  {
    author: "John Doe",
    text: "My dental clinician isn’t just about fixing smiles; it’s about creating them.",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="review-sec">
     <h1 className='testimonialheading'>Hear from our Users</h1> 
      <div className="testimonials-section">
        <Slider {...settings}>  {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
