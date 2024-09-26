import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import imdbLogo from './IMDB_Logo_2016.svg.png'; // Update the path accordingly
import './MovieDetails.css';
import {jwtDecode}  from 'jwt-decode'; // Ensure this is installed via npm

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [watched, setWatched] = useState(false);
  const [liked, setLiked] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const getAuthToken = () => {
    const token = localStorage.getItem('token');
    return token; 
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const token = getAuthToken();
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken && decodedToken.username) {
            setUsername(decodedToken.username);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://yourmovies-app-backend.onrender.com/api/movies/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchUserActions = async () => {
      const token = getAuthToken();
      if (!token) return; // Don't fetch if not authenticated

      try {
        const response = await axios.get(`https://yourmovies-app-backend.onrender.com/api/movies/${movieId}/user-actions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { liked, watched, inWatchlist } = response.data; // Assuming your API returns this structure
        setLiked(liked);
        setWatched(watched);
        setInWatchlist(inWatchlist);
      } catch (error) {
        console.error('Error fetching user actions:', error);
      }
    };

    checkAuthentication();
    fetchMovie();
    fetchUserActions();
  }, [movieId]);

  // Handle action and update both backend and UI
  const handleAction = async (action) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Token not found');
      }

      const newActions = { liked, watched, inWatchlist }; // Capture current state
      if (action === 'watched') newActions.watched = true;
      if (action === 'like') newActions.liked = true;
      if (action === 'watchlist') newActions.inWatchlist = true;

      await axios.post(`https://yourmovies-app-backend.onrender.com/api/movies/${movieId}/user-actions`, newActions, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update UI
      if (action === 'watched') setWatched(true);
      if (action === 'like') setLiked(true);
      if (action === 'watchlist') setInWatchlist(true);
    } catch (error) {
      console.error(`Error performing action ${action}:`, error.message);
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative">
        <img
          src={movie.backdrop || 'https://via.placeholder.com/1280x720'}
          alt={movie.title}
          className="w-full h-[500px] object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 py-8 flex flex-col lg:flex-row justify-center items-center lg:space-x-12">
        <div className="flex flex-col lg:flex-row justify-center items-start space-y-8 lg:space-y-0 lg:space-x-12 max-w-5xl w-full">
          <div className="flex flex-col items-center lg:items-start">
            <img
              src={movie.poster || 'https://via.placeholder.com/300x450'}
              alt={movie.title}
              className="w-72 h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="flex-grow max-w-xl lg:max-w-md px-6">
            <h1 className="movie-title text-4xl font-bold mb-4 text-center lg:text-left">{movie.title || 'No Title'}</h1>
            <p className="Montserrat text-sm text-gray-400 mb-6 text-center lg:text-left">
              {new Date(movie.releaseDate).getFullYear() || 'No Release Date'} | Directed by{' '}
              <span className="Montserrat font-semibold text-gray-300">{movie.director || 'Unknown'}</span>
            </p>
            <p className="Montserrat text-sm text-center lg:text-left text-gray-300">{movie.description || 'No Description Available'}</p>

            <div className="mt-4">
              {movie.actors && (
                <p className="Montserrat text-sm text-gray-400 mb-2"><strong>Actors:</strong> {movie.actors.join(', ')}</p>
              )}
              {movie.runtime && (
                <p className="Montserrat text-sm text-gray-400 mb-2"><strong>Runtime:</strong> {movie.runtime}</p>
              )}
              {movie.genres && (
                <p className="Montserrat text-sm text-gray-400 mb-6"><strong>Genres:</strong> {movie.genres.join(', ')}</p>
              )}
              {movie.imdbRating && (
                <div className="flex items-center mt-2">
                  <img src={imdbLogo} alt="IMDb" className="h-6 mr-2" />
                  <div className="flex items-baseline">
                    <span className="text-2xl text-white font-bold mr-1">{movie.imdbRating}</span>
                    <span className="text-sm text-gray-400">/10</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-72 h-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <button
              onClick={() => handleAction('watched')}
              className={`flex items-center space-x-2 ${watched ? 'bg-green-600' : 'bg-blue-600'} text-white px-4 py-2 rounded-lg w-full mb-4 hover:bg-blue-700`}
              disabled={watched}
            >
              <i className="fas fa-eye"></i>
              <span>{watched ? 'Watched' : 'Watch'}</span>
            </button>

            <button
              onClick={() => handleAction('like')}
              className={`flex items-center space-x-2 ${liked ? 'bg-red-600' : 'bg-orange-500'} text-white px-4 py-2 rounded-lg w-full mb-4 hover:bg-orange-600`}
              disabled={liked}
            >
              <i className="fas fa-heart"></i>
              <span>{liked ? 'Liked' : 'Like'}</span>
            </button>

            <button
              onClick={() => handleAction('watchlist')}
              className={`flex items-center space-x-2 ${inWatchlist ? 'bg-gray-700' : 'bg-gray-600'} text-white px-4 py-2 rounded-lg w-full mb-4 hover:bg-gray-700`}
              disabled={inWatchlist}
            >
              <i className="fas fa-plus"></i>
              <span>{inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
            </button>

            {isAuthenticated && (
              <div className="mt-4 text-center">
                <p className="text-gray-400">Welcome, {username}!</p>
              </div>
            )}

            <div className="flex justify-center items-center space-x-1">
              <i className="fas fa-star text-yellow-500"></i>
              <span className="text-white text-lg">{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
