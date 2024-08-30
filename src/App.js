import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import styles from "./App.module.scss";

const data_URL = process.env.REACT_APP_DATA_URL;
const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      const res = await fetch(`${data_URL}discover/movie?api_key=${api_key}`);
      const json = await res.json();
      setMovieList(json.results);
      setFilteredMovieList(json.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteMovies"));
    if (storedFavorites) {
      setFavoriteMovies(storedFavorites);
    }
  };

  useEffect(() => {
    fetchMovies();
    loadFavorites();
  }, []);

  const toggleFavorite = (id) => {
    let updatedFavorites;
    if (favoriteMovies.includes(id)) {
      updatedFavorites = favoriteMovies.filter((movieId) => movieId !== id);
    } else {
      updatedFavorites = [...favoriteMovies, id];
    }
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  // Open modal function
  const openModal = (movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className={styles.appContainer}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        loading={loading}
        setLoading={setLoading}
        movieList={movieList}
        setFilteredMovieList={setFilteredMovieList}
      />
      {loading ? (
        <div className={styles.loader}>Loading...</div>
      ) : (
        <MovieList
          movies={filteredMovieList}
          favoriteMovies={favoriteMovies}
          toggleFavorite={toggleFavorite}
          openModal={openModal}
          closeModal={closeModal}
          selectedMovie={selectedMovie}
        />
      )}
    </div>
  );
};

export default App;
