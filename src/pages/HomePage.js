import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const movies = [
  { _id: '66ec2c1147263fe359da2568', title: 'Inception', poster: 'https://a.ltrbxd.com/resized/sm/upload/sv/95/s9/4j/inception-0-1000-0-1500-crop.jpg?v=30d7224316' },
  { _id: '66ec2c1147263fe359da256a', title: 'The Dark Knight', poster: 'https://a.ltrbxd.com/resized/sm/upload/78/y5/zg/ej/oefdD26aey8GPdx7Rm45PNncJdU-0-1000-0-1500-crop.jpg?v=2d0ce4be25' },
  { _id: '66ec6b61d981232fdda53eb0', title: 'Whiplash', poster: 'https://a.ltrbxd.com/resized/sm/upload/cl/dn/kr/f1/4C9LHDxMsoYI0S3iMPZdm3Oevwo-0-1000-0-1500-crop.jpg?v=d13ea36528' },
  { _id: '66edafa79524406e7daf95c8', title: 'La La Land', poster: 'https://a.ltrbxd.com/resized/film-poster/2/4/0/3/4/4/240344-la-la-land-0-1000-0-1500-crop.jpg?v=053670ff84' },
  { _id: '66edb1199524406e7daf95dc', title: 'Dune: Part One', poster: 'https://a.ltrbxd.com/resized/sm/upload/nx/8b/vs/gc/cDbNAY0KM84cxXhmj8f0dLWza3t-0-1000-0-1500-crop.jpg?v=49eed12751' },
  { _id: '66edafa79524406e7daf95c7', title: 'Spider-Man: Across the Spider-Verse', poster: 'https://a.ltrbxd.com/resized/film-poster/4/9/7/6/3/1/497631-spider-man-across-the-spider-verse-0-1000-0-1500-crop.jpg?v=f2acbf1b8a' },
  { _id: '66edb1ce9524406e7daf95f3', title: 'The Lord of the Rings: The Fellowship of the Ring', poster: 'https://a.ltrbxd.com/resized/sm/upload/3t/vq/0u/m6/1tX9ZlgVvWjAQhMs1vAfsYpi7VK-0-1000-0-1500-crop.jpg?v=30bbb824e1' },
  { _id: '66ec6b61d981232fdda53eb4', title: 'Shutter Island', poster: 'https://a.ltrbxd.com/resized/film-poster/4/5/4/0/9/45409-shutter-island-0-1000-0-1500-crop.jpg?v=85dd4c38e3' },
];


const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [username, setUsername] = useState(null);

  // Function to decode the JWT and get the username
  const getUsernameFromToken = () => {
    const token = localStorage.getItem('token'); // Or however you're storing the JWT
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username); // Assuming your token payload contains a 'username' field
      } catch (error) {
        console.error("Invalid token:", error);
        setUsername(null);
      }
    }
  };

  // Run once when component mounts to get username
  useEffect(() => {
    getUsernameFromToken();

    // Auto-scrolling for the movie carousel
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getVisibleMovies = () => {
    const visibleMovies = [];
    for (let i = 0; i < 5; i++) {
      visibleMovies.push(movies[(currentIndex + i) % movies.length]);
    }
    return visibleMovies;
  };

  const getMovieClass = (index) => {
    if (index === 2) return 'scale-125 opacity-100'; // Active center movie
    if (index === 1 || index === 3) return 'scale-110 opacity-80'; // Near center
    if (index === 0 || index === 4) return 'scale-90 opacity-50'; // Edge
    return '';
  };

  const visibleMovies = getVisibleMovies();

  return (
    <div
      className="relative h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `url('bg-img.jpg')`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative flex flex-col items-center justify-center h-full z-10">
      <header className="text-center mb-12">
  <h1 className="text-5xl font-bold text-gray-200">
    {username ? (
      <>
        Welcome back,{' '}
        <Link
          to={`/${username}`}
          className="font-bold text-white hover:underline hover:text-gray-200"
        >
          {username}
        </Link>
      </>
    ) : (
      'Welcome to Yourmovies website'
    )}
  </h1>
  <p className="text-xl mt-4 text-gray-200">
    Browse and search your favorite{' '}
    <Link to="/movies" className="text-gray-200 font-semibold hover:underline">
      movies
    </Link>
  </p>
</header>

        <main className="text-center w-full">
          <section>
            <h2 className="text-3xl font-semibold text-gray-200">Featured Movies</h2>
            <p className="mt-2 mb-8 text-gray-200">
              Check out the latest and greatest movies.
            </p>

            <div className="relative w-full flex justify-center items-center space-x-10 overflow-visible">
              {visibleMovies.map((movie, index) => (
                <div
                  key={movie._id}
                  className={`transition-transform transform duration-1000 ease-in-out ${getMovieClass(
                    index
                  )}`}
                  style={{
                    transition: 'transform 1s ease, opacity 1s ease',
                  }}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  const imageUrl = movie.poster || 'https://via.placeholder.com/200x300';

  return (
    <Link to={`/movies/${movie._id}`} className="block">
      <div className="relative rounded-lg shadow-md overflow-hidden flex flex-col items-center cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-105">
        <div className="relative w-32 h-48 mb-0 flex-shrink-0">
          <img
            src={imageUrl}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/200x300')} // Fallback image
          />
        </div>
        <div className="absolute inset-0 rounded-lg border-2 border-transparent transition-colors duration-300 hover:border-[#FF6F61] hover:border-4" />
      </div>
    </Link>
  );
};

export default HomePage;
