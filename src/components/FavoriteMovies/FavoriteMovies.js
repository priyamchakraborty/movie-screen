import React from "react";
import MovieList from "../MovieList/MovieList";

const FavoriteMovies = ({
  movies,
  toggleFavorite,
  openModal,
  favoriteMovies,
}) => {
  return (
    <MovieList
      movies={movies}
      toggleFavorite={toggleFavorite}
      openModal={openModal}
      favoriteMovies={favoriteMovies}
    />
  );
};

export default FavoriteMovies;
