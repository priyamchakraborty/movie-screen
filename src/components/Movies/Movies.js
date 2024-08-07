import React, { useEffect, useState } from "react";
import styles from "./Movies.module.scss";

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const getMovie = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=f413b4fc01fc9577f826147de2d85b1d",
      );
      const json = await res.json();
      setMovieList(json.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieList);

  return (
    <div className={styles.listContainer}>
      {movieList.map((movie) => {
        return (
          <div className={styles.card}>
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
            />
            <div className={styles.overlay}>
              <h4>{movie.title}</h4>
              <div>Rating: {movie.vote_average}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Movies;
