import React, { useEffect, useState } from "react";
import styles from "./Movies.module.scss";

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const image_URL = "https://image.tmdb.org/t/p/w500";
  const data_URL = "https://api.themoviedb.org/3/discover/movie?api_key=";
  const api_key = "f413b4fc01fc9577f826147de2d85b1d";
  const getMovie = async () => {
    try {
      const res = await fetch(`${data_URL}${api_key}`);
      const json = await res.json();
      setMovieList(json.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    getMovie();
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  console.log(movieList);

  return (
    <div className={styles.listContainer}>
      {movieList.map(
        ({
          id,
          poster_path,
          original_title,
          title,
          vote_average,
          release_date,
          overview,
        }) => {
          const dateStr = release_date;
          const date = new Date(dateStr);
          const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
          const rating = vote_average.toFixed(1);
          const ratingPercent = rating * 10;
          return (
            <div
              key={id}
              className={styles.card}
              onClick={() => openModal({ title, overview })}
            >
              <div className={styles.moviePoster}>
                <img src={`${image_URL}${poster_path}`} alt={original_title} />
              </div>
              <div className={styles.info}>
                <div>
                  <h4>{title}</h4>
                  <p>{formattedDate}</p>
                  <p>{overview}</p>
                </div>
                <div className={styles.progressRateContainer}>
                  <div className={styles.rating}>{rating}</div>
                  <div
                    className={styles.progressBar}
                    style={{
                      background: `radial-gradient(
                                    closest-side,
                                    #282c34 79%,
                                    transparent 80% 100%
                                ),
                                conic-gradient(#dddd3d ${ratingPercent}%, grey 0)`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        },
      )}
      {selectedMovie && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.overview}</p>
            <button onClick={closeModal} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
