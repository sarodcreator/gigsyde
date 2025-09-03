import React from "react";
import { FaQuoteLeft, /*FaQuoteRight*/ } from 'react-icons/fa';
import './ui/style/testimonial.css';

const TestimonialCard = ({ title, text, author }) => {
  return (
	  <div className="testimonial-card">
		  <div className="card-background">
			  <FaQuoteLeft />
		  </div> 
		  <div className="reviewfrom">
			  <FaQuoteLeft />
		  </div>
		  <div>
			  
			  <p>{text}</p>
        <div className="testimonialdivider"></div>
			  <p className='author'>{author}</p>
		  </div>
		  {/* <div className="reviewfrom">
			  <FaQuoteRight />
		  </div> */}
	  </div>
  );
};

export default TestimonialCard;
