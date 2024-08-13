import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieList.module.scss";
import { FaRegTimesCircle } from "react-icons/fa";

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
        <div
          className={styles.modalOverlay}
          onClick={e => {
            if (e.target.classList.contains(styles.modalOverlay)) {
              closeModal();
            }
          }}
        >
          <div className={styles.modal}>
            <button onClick={closeModal} className={styles.closeButton}>
              <FaRegTimesCircle />
            </button>
            <div className={styles.overlay}></div>
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}${selectedMovie.backdrop_path}`}
              alt={selectedMovie.title}
            />
            <div className={styles.modalBody}>
              <h2>{selectedMovie.title}</h2>
              <p>{selectedMovie.overview}</p>
              <p>
                <b>Release:</b> {selectedMovie.formattedDate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
