import React, { useEffect, useState } from "react";
import styles from "./Movies.module.scss";
import logo from "./../Images/movie-screen-logo.png";

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

  const openModal = movie => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  console.log(movieList);

  return (
    <>
      <header className={styles.headerContainer}>
        <img src={logo} />
      </header>
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
            backdrop_path,
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
                onClick={() =>
                  openModal({ title, overview, backdrop_path, formattedDate })
                }
              >
                <div className={styles.moviePoster}>
                  <img
                    src={`${image_URL}${poster_path}`}
                    alt={original_title}
                  />
                </div>
                <div className={styles.info}>
                  <div>
                    <h4>{title}</h4>
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
          }
        )}
        {selectedMovie && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button onClick={closeModal} className={styles.closeButton} />
              <div className={styles.overlay}></div>
              <img src={`${image_URL}${selectedMovie.backdrop_path}`} />
              <div className={styles.modalBody}>
                <h2>{selectedMovie.title}</h2>
                <p>{selectedMovie.overview}</p>
                <p>Release: {selectedMovie.formattedDate}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Movies;
