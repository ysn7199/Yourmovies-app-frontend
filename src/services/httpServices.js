import axios from 'axios';

// Set your backend base URL here
const API_URL = 'https://yourmovies-app-backend.onrender.com/api'; // Adjust the URL as needed

// Function to get the current user's information
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data; // Adjust based on your backend response
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  }
};

// Function to check if user is authenticated
export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/check`);
    return response.data; // Adjust based on your backend response
  } catch (error) {
    console.error('Error checking authentication', error);
    throw error;
  }
};

const fetchGenres = async () => {
  try {
    const response = await axios.get('https://yourmovies-app-backend.onrender.com/api/genres'); // Ensure this matches your server's base URL
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
};

const fetchMovies = async () => {
  try {
    const response = await axios.get('https://yourmovies-app-backend.onrender.com/api/movies'); // Ensure this matches your server's base URL
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};
