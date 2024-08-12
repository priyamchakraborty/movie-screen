import React, { useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieList.module.scss";

const MovieList = ({
  movies,
  favoriteMovies,
  toggleFavorite,
  openModal,
  closeModal,
  selectedMovie,
}) => {
  if (movies.length === 0) {
    return (
      <div className={styles.listContainer}>
        <div className={styles.noMovies}>
          If its not in this list it is not a popular movie
        </div>
        ;
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          toggleFavorite={toggleFavorite}
          openModal={openModal}
          isFavorite={favoriteMovies.includes(movie.id)}
        />
      ))}
      {selectedMovie && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button onClick={closeModal} className={styles.closeButton}>
              X
            </button>
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}${selectedMovie.backdrop_path}`}
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
  );
};

export default MovieList;
