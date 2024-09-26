import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar'; // Keep only this one

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 24;

  // Fetch genres from the backend
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://yourmovies-app-backend.onrender.com/api/genres'); // Update with your backend URL
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  // Fetch movies when query, selectedGenre, or currentPage changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://yourmovies-app-backend.onrender.com/api/movies', {
          params: {
            search: query, // This query is passed to the backend
            genre: selectedGenre,
            page: currentPage,
            limit: itemsPerPage,
          },
        });
    
        if (Array.isArray(response.data.movies)) {
          setMovies(response.data.movies);
        } else {
          setMovies([]);
        }
    
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    

    fetchMovies();
  }, [query, selectedGenre, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <SearchBar
        query={query}
        setQuery={setQuery}
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}  // Pass the selected genre to SearchBar
      />
      <MovieGrid
        movies={movies}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Movies;
