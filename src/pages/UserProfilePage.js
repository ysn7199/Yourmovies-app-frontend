import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import defaultProfilePic from './defaultProfilePic.jpg';
import MovieGrid from '../components/MovieGrid';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('liked');
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Update this dynamically as per your backend response

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        fetchUserMovies();
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const fetchUserMovies = async () => {
    try {
      const response = await axios.get('https://yourmovies-app-backend.onrender.com/api/movies/user/movies', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setLikedMovies(response.data.likedMovies);
      setWatchedMovies(response.data.watchedMovies);
      setWatchlistMovies(response.data.watchlistMovies);
    } catch (error) {
      console.error('Error fetching user movies:', error);
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const renderMovies = () => {
    const movies = activeTab === 'liked' ? likedMovies : 
                   activeTab === 'watched' ? watchedMovies : 
                   watchlistMovies;

    return movies.length > 0 ? (
      <MovieGrid movies={movies} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    ) : (
      <p className="text-gray-500 text-lg text-center">No movies found in this category.</p>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-48">
        <img
          src="https://via.placeholder.com/1280x720"
          alt="Backdrop"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      {/* Profile Section */}
      <div className="relative flex flex-col items-center mt-[-40px] mb-8">
        <div
          className={`relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg z-10 transition-opacity duration-300`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={defaultProfilePic}
            alt="Profile"
            className={`w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-50' : 'opacity-100'}`}
          />
          {isHovered && (
            <p className="absolute inset-0 flex justify-center items-center text-white text-xs font-semibold">New Avatar</p>
          )}
        </div>
        <h2 className="text-2xl font-semibold mt-4">{user.username}</h2>
        <p className="text-gray-400 text-center">{user.email}</p>
      </div>

      {/* Navbar for Watched, Likes, Watchlist */}
      <div className="flex justify-center space-x-6 mb-8">
        <button
          className={`px-4 py-2 ${activeTab === 'liked' ? 'bg-blue-600' : 'bg-gray-700'} rounded-lg hover:bg-blue-700 transition duration-300`}
          onClick={() => setActiveTab('liked')}
        >
          Likes
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'watched' ? 'bg-blue-600' : 'bg-gray-700'} rounded-lg hover:bg-blue-700 transition duration-300`}
          onClick={() => setActiveTab('watched')}
        >
          Watched
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'watchlist' ? 'bg-blue-600' : 'bg-gray-700'} rounded-lg hover:bg-blue-700 transition duration-300`}
          onClick={() => setActiveTab('watchlist')}
        >
          Watchlist
        </button>
      </div>

      {/* Movies Section */}
      <div className="mx-4 mb-8">
        {renderMovies()}
      </div>
    </div>
  );
};

export default UserProfile;
