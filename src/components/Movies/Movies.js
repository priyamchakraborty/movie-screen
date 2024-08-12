import React, { useEffect, useState } from "react";
import styles from "./Movies.module.scss";
import logo from "./../Images/movie-screen-logo.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const image_URL = process.env.REACT_APP_IMAGE_URL;
const data_URL = process.env.REACT_APP_DATA_URL;
const api_key = process.env.REACT_APP_API_KEY;

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const getMovie = async () => {
    try {
      const res = await fetch(`${data_URL}${api_key}`);
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

  useEffect(() => {
    getMovie();
  }, []);

  useEffect(() => {
    const filteredMovies = movieList.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovieList(filteredMovies);
  }, [searchTerm, movieList]);

  useEffect(() => {
    if (showFavorites) {
      const favoriteMovieList = movieList.filter(movie =>
        favoriteMovies.includes(movie.id)
      );
      setFilteredMovieList(favoriteMovieList);
    } else {
      setFilteredMovieList(movieList);
    }
  }, [showFavorites, favoriteMovies, movieList]);

  const openModal = movie => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.favoritesLink}>
          <button onClick={() => setShowFavorites(!showFavorites)}>
            {showFavorites ? "Show All Movies" : "Show Favorite Movies"}
          </button>
        </div>
      </header>
      <div className={styles.listContainer}>
        {filteredMovieList.map(
          ({
            id,
            poster_path,
            original_title,
            title,
            vote_average,
            release_date,
            overview,
            backdrop_path,
          }) => {
            const dateStr = release_date;
            const date = new Date(dateStr);
            const formattedDate = date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            const rating = vote_average.toFixed(1);
            const ratingPercent = rating * 10;
            const isFavorite = favoriteMovies.includes(id);
            return (
              <div className={styles.movieCard} key={id}>
                <div
                  className={styles.favoriteIcon}
                  onClick={e => {
                    e.stopPropagation();
                    toggleFavorite(id);
                  }}
                >
                  {isFavorite ? (
                    <FaHeart className={styles.favorite} />
                  ) : (
                    <FaRegHeart className={styles.notFavorite} />
                  )}
                </div>
                <div
                  className={styles.card}
                  onClick={() =>
                    openModal({ title, overview, backdrop_path, formattedDate })
                  }
                >
                  <div className={styles.moviePoster}>
                    <img
                      src={`${image_URL}${poster_path}`}
                      alt={original_title}
                    />
                  </div>
                  <div className={styles.info}>
                    <div>
                      <h4>{title}</h4>
                    </div>
                    <div className={styles.progressRateContainer}>
                      <div className={styles.rating}>{rating}</div>
                      <div
                        className={styles.progressBar}
                        style={{
                          background: `radial-gradient(
                                    closest-side,
                                    #282c34 79%,
                                    transparent 80% 100%
                                ),
                                conic-gradient(#dddd3d ${ratingPercent}%, grey 0)`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
        {selectedMovie && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button onClick={closeModal} className={styles.closeButton} />
              <div className={styles.overlay}></div>
              <img
                src={`${image_URL}${selectedMovie.backdrop_path}`}
                alt={selectedMovie.title}
              />
              <div className={styles.modalBody}>
                <h2>{selectedMovie.title}</h2>
                <p>{selectedMovie.overview}</p>
                <p>Release: {selectedMovie.formattedDate}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Movies;
