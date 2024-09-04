import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieList.module.scss";
import { FaRegTimesCircle } from "react-icons/fa";

const MovieList = ({ movies, favoriteMovies, toggleFavorite }) => {
  // If the movies array is empty, display a message
  if (movies.length === 0) {
    return (
      <div className={styles.listContainer}>
        <div className={styles.noMovies}>No movies to display.</div>
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
          isFavorite={favoriteMovies.includes(movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieList;
