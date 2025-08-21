import React from "react";

const TestimonialCard = ({ name, role, text, rating, img }) => {
  return (
    <div className="testimonial-card">
      <p className="testimonial-text">{text}</p>
      <div className="review-from">
        <img src={img} alt={`${name}'s profile`} className="reviewer-img" />
        <div className="reviewer-info">
          <h4 className="reviewer-name">{name}</h4>
          <p className="reviewer-role">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
