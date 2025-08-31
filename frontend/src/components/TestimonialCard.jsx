import React from "react";
import { FaQuoteLeft, /*FaQuoteRight*/ } from 'react-icons/fa';

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
			  <h2 id="testimonial-title">What they say</h2>
			  <div className="testimonial-card-divider"></div>
			  <p>{text}</p>
			  <p className='author'>{author}</p>
		  </div>
		  {/* <div className="reviewfrom">
			  <FaQuoteRight />
		  </div> */}
	  </div>
  );
};

export default TestimonialCard;
