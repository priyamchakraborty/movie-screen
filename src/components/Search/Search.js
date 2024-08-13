import React, { useEffect } from "react";
import styles from "./Search.module.scss";

const Search = ({
  searchTerm,
  setSearchTerm,
  movieList,
  loading,
  setLoading,
  setFilteredMovieList,
}) => {
  useEffect(() => {
    setLoading(true);
    const filteredMovies = movieList.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredMovieList(filteredMovies);
    setLoading(false);
  }, [searchTerm, movieList, setFilteredMovieList, setLoading]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default Search;
