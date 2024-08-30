import React from "react";
import MovieList from "../MovieList/MovieList";

const FavoriteMovies = ({
  movies,
  toggleFavorite,
  openModal,
  favoriteMovies,
}) => {
  const favoriteMovieList = movies.filter((movie) =>
    favoriteMovies.includes(movie.id),
  );

  return (
    <MovieList
      movies={favoriteMovieList}
      toggleFavorite={toggleFavorite}
      openModal={openModal}
      favoriteMovies={favoriteMovies}
    />
  );
};

export default FavoriteMovies;
