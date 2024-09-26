import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwtDecode
import './Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isFixed, setIsFixed] = useState(false); // State to manage fixed navbar
  const navigate = useNavigate(); // Hook for programmatic navigation
  const location = useLocation(); // Hook to get the current location

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.username) {
          setUsername(decodedToken.username);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    const handleScroll = () => {
      setIsFixed(window.scrollY > 0); // Set fixed if scrolled
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  const isMoviePage = location.pathname.startsWith('/movies/'); // Check if on movie detail page

  return (
    <nav className={`navbar ${isFixed ? 'fixed' : ''} ${isMoviePage ? 'bg-transparent' : 'bg-gray-800'} p-4 text-white`}>
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <Link to="/" className="Logo text-2xl font-bold mr-8">
          yourmovies
        </Link>
        <div className="flex-grow"></div>
        <div className="flex items-center space-x-8">
          <Link to="/movies" className="text-gray-400 hover:text-white transition-colors duration-300">
            Movies
          </Link>
          <input
            type="text"
            placeholder="Search"
            className={`px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 max-w-xs ${
              isMoviePage ? 'bg-gray-800 bg-opacity-30' : 'bg-gray-700'
            }`}
            style={{
              transition: 'background-color 0.3s ease',
            }}
          />
          {isAuthenticated ? (
            <>
              <Link to={`/${username}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                {username}
              </Link>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors duration-300">
                Login
              </Link>
              <Link to="/register" className="text-gray-400 hover:text-white transition-colors duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
