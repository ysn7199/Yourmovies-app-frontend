// src/components/GenreFilter.js
import React from 'react';

const GenreFilter = ({ genres, selectedGenre, setSelectedGenre }) => {
  return (
    <div className="mb-4">
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre._id} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
