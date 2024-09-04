import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "./../Images/movie-screen-logo.png";
import { FaArrowLeft } from "react-icons/fa";

import Search from "../Search/Search";

const Header = ({
  searchTerm,
  setSearchTerm,
  showFavorites,
  setShowFavorites,
  movieList,
  setFilteredMovieList,
  loading,
  setLoading,
}) => {
  // Get the current location and navigate function from the react-router-dom package
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If the showFavorites state is true, filter the movieList array
    if (showFavorites) {
      // Filter the movies array to only include the movies that are in the favoriteMovies array
      const favoriteMovieList = movieList.filter(movie =>
        JSON.parse(localStorage.getItem("favoriteMovies")).includes(movie.id)
      );

      // Pass the favoriteMovieList array to the setFilteredMovieList function
      setFilteredMovieList(favoriteMovieList);
    } else {
      // If the showFavorites state is false, pass the movieList array to the setFilteredMovieList function
      setFilteredMovieList(movieList);
    }
  }, [showFavorites, movieList, setFilteredMovieList]);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      {/* Pass the setSearchTerm, searchTerm, movieList, loading, setLoading, and setFilteredMovieList functions to the Search component */}
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        movieList={movieList}
        loading={loading}
        setLoading={setLoading}
        setFilteredMovieList={setFilteredMovieList}
      />
      <div className={styles.headerButton}>
        {/* If the pathname includes "/movie/", display a back button or show favorites  */}
        {location.pathname.includes("/movie/") ? (
          <button onClick={() => navigate(-1)}>
            <FaArrowLeft />
            Back
          </button>
        ) : (
          <button onClick={() => setShowFavorites(!showFavorites)}>
            {showFavorites ? "Show All Movies" : "Show Favorite Movies"}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
