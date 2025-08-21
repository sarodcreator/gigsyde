import React from 'react';
import PropTypes from 'prop-types';
import './ui/style/category.css';

const Card = ({ icon: Icon, title, description }) => {
  return (
    <div className="card">
      <div className="card-icon">
        <Icon size={40} />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
