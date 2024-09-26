import React from 'react';
import MovieCard from './MovieCard';
import Pagination from './Pagination'; // Import the Pagination component

const MovieGrid = ({ movies, currentPage, totalPages, onPageChange }) => {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-500">No movies found</p>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default MovieGrid;
