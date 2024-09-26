import React, { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import './StarRating.css';  // Optional: Add your custom styling here

const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleMouseEnter = (value) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const value = index + 1;
        return (
          <span
            key={index}
            className="star"
            onClick={() => handleClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
          >
            {hover >= value || rating >= value ? (
              <FaStar color="#ffc107" />
            ) : hover >= value - 0.5 || rating >= value - 0.5 ? (
              <FaStarHalfAlt color="#ffc107" />
            ) : (
              <FaRegStar color="#e4e5e9" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
