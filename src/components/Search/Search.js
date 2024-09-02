import React, { useEffect } from "react";
import styles from "./Search.module.scss";

const api_key = process.env.REACT_APP_API_KEY;
const search_URL = process.env.REACT_APP_SEARCH_URL;
const data_URL = process.env.REACT_APP_DATA_URL;

const Search = ({
  searchTerm,
  setSearchTerm,
  setFilteredMovieList,
  setLoading,
}) => {
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const url = searchTerm
          ? `${search_URL}?api_key=${api_key}&query=${searchTerm}`
          : `${data_URL}discover/movie?api_key=${api_key}`;

        const res = await fetch(url);
        const json = await res.json();
        setFilteredMovieList(json.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }

      setLoading(false);
    };

    const debounceFetch = setTimeout(fetchMovies, 500);

    return () => clearTimeout(debounceFetch);
  }, [searchTerm, setFilteredMovieList, setLoading]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="search"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default Search;
