import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { useLocation } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { api_key, data_URL } from "./components/apiConfig";
import styles from "./App.module.scss";


const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    // Fetch the movies from the API
    try {
      const res = await fetch(`${data_URL}discover/movie?api_key=${api_key}`);
      const json = await res.json();
      setMovieList(json.results);
      setFilteredMovieList(json.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Load the favorite movies from local storage
  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteMovies"));
    if (storedFavorites) {
      setFavoriteMovies(storedFavorites);
    }
  };

  // Fetch the movies and load the favorites when the component mounts
  useEffect(() => {
    fetchMovies();
    loadFavorites();
  }, []);

  // Toggle the favorite state of a movie
  const toggleFavorite = id => {
    let updatedFavorites;
    if (favoriteMovies.includes(id)) {
      updatedFavorites = favoriteMovies.filter(movieId => movieId !== id);
    } else {
      updatedFavorites = [...favoriteMovies, id];
    }
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  return (
    <Router>
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
          <Loader />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <MovieList
                  movies={filteredMovieList}
                  favoriteMovies={favoriteMovies}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
