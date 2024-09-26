import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import Navbar from './components/Navbar';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';


function App() {
  // State for pagination and movie data
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/movies"
          element={
            <Movies
              movies={movies}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          }
        />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route 
          path="/login" 
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          } 
        />

        <Route path="/:username" element={<UserProfilePage />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
