import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api_key, data_URL, search_URL } from "../apiConfig";
import styles from "./Search.module.scss";

const Search = ({
  searchTerm,
  setSearchTerm,
  setFilteredMovieList,
  setLoading,
}) => {
  // Get the navigate and location functions from the react-router-dom package
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch the movies from the API
    const fetchMovies = async () => {
      setLoading(true);

      try {
        // If the searchTerm is not empty, fetch the movies using the search_URL
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
      // If the pathname includes "/movie/", navigate to the home page with the search query
      if (location.pathname.includes("/movie/")) {
        navigate(`/?search=${searchTerm}`);
      }
    };

    // Set a timeout to debounce the fetchMovies function
    const debounceFetch = setTimeout(fetchMovies, 500);

    // Clear the timeout if the searchTerm changes
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
