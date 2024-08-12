import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import logo from "./../Images/movie-screen-logo.png";
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
  useEffect(() => {
    if (showFavorites) {
      const favoriteMovieList = movieList.filter(movie =>
        JSON.parse(localStorage.getItem("favoriteMovies")).includes(movie.id)
      );
      setFilteredMovieList(favoriteMovieList);
    } else {
      setFilteredMovieList(movieList);
    }
  }, [showFavorites, movieList, setFilteredMovieList]);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        movieList={movieList}
        loading={loading}
        setLoading={setLoading}
        setFilteredMovieList={setFilteredMovieList}
      />
      <div className={styles.favoritesLink}>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? "Show All Movies" : "Show Favorite Movies"}
        </button>
      </div>
    </header>
  );
};

export default Header;
