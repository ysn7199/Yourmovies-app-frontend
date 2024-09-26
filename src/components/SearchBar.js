import React from 'react';

const SearchBar = ({ query, setQuery, genres, selectedGenre, setSelectedGenre }) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="p-2 border border-gray-300 rounded-md w-full md:w-1/2 lg:w-1/3 shadow-md"
      />
      <select
        value={selectedGenre}
        onChange={e => setSelectedGenre(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded-md w-full md:w-1/2 lg:w-1/3 shadow-md"
      >
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre._id} value={genre.name}>{genre.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
