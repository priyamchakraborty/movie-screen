import React from "react";
import MovieList from "../MovieList/MovieList";

const FavoriteMovies = ({ movies, toggleFavorite, favoriteMovies }) => {
  // Filter the movies array to only include the movies that are in the favoriteMovies array
  const favoriteMovieList = movies.filter(movie =>
    favoriteMovies.includes(movie.id)
  );

  return (
    // Pass the favoriteMovieList array to the MovieList component
    <MovieList
      movies={favoriteMovieList}
      toggleFavorite={toggleFavorite}
      favoriteMovies={favoriteMovies}
    />
  );
};

export default FavoriteMovies;
