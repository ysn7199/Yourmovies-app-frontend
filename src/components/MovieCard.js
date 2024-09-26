import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  // Default image URL if poster is not provided
  const imageUrl = movie.poster || 'https://via.placeholder.com/200x300';

  return (
    <Link to={`/movies/${movie._id}`} className="block">
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center cursor-pointer">
        <div className="relative w-32 h-48 mb-0 flex-shrink-0">
          <img
            src={imageUrl}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/200x300')} // Fallback image
          />
        </div>
        <div className="absolute inset-0 rounded-lg border-2 border-transparent transition-colors duration-300 hover:border-[#FF6F61] hover:border-4" />
      </div>
    </Link>
  );
};

export default MovieCard;
