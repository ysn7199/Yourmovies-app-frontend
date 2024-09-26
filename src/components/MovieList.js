import React, { useState, useEffect } from 'react';
import { fetchMovies, fetchGenres } from '../services/httpServices';
import MovieCard from './MovieCard'; // Create a MovieCard component

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      }
    };
    getGenres();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { movies, totalPages } = await fetchMovies({ search, genre: selectedGenre, page });
        setMovies(movies);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };
    getMovies();
  }, [search, selectedGenre, page]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center mb-4">
        <input
          type="text"
          placeholder="Search for movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-full md:w-1/2"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border rounded p-2 ml-2"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre._id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
