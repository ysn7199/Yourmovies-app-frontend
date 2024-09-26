import { useEffect, useState } from 'react';
import axios from 'axios';

const useMovies = (currentPage) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/api/movies?page=${currentPage}`);
        setMovies(response.data.movies);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  return { movies, totalPages };
};

export default useMovies;
