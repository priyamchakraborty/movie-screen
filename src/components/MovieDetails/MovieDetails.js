import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import styles from "./MovieDetails.module.scss";

const api_key = process.env.REACT_APP_API_KEY;
const data_URL = process.env.REACT_APP_DATA_URL;
const image_URL = process.env.REACT_APP_IMAGE_URL;

const MovieDetails = () => {
  // Get the id from the URL
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch the movie details using the id
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`${data_URL}movie/${id}?api_key=${api_key}`);
        const json = await res.json();
        setMovie(json);
        console.log(json);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    // Call the fetchMovieDetails function
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <Loader />;

  return (
    <div className={styles.movieDetails}>
      <div className={styles.container}>
        <div class={styles.movieDetails}>
          <div className={styles.backdropContainer}>
            <img
              src={`${image_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className={styles.backdrop}
            />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.details}>
            <div className={styles.posterContainer}>
              <div>
                <img
                  src={`${image_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.poster}
                />
              </div>
              <div className={styles.movieInfo}>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p>
                  <b>Release Date:</b>{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <p>
                  <b>Rating:</b> {movie.vote_average.toFixed(1)}
                </p>
                <p>
                  <b>Genre:</b>{" "}
                  {movie.genres.map(genre => genre.name).join(", ")}
                </p>
                <p>
                  <b>Language: </b>
                  {movie.spoken_languages
                    .map(language => language.name)
                    .join(", ")}
                </p>
                <p>
                  <b>Origin Country: </b>
                  {movie.production_countries
                    .map(country => country.name)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.productionCompanies}>
            <h3>Production Companies</h3>
            <div className={styles.companyList}>
              {movie.production_companies.map(company => (
                <div key={company.id} className={styles.company}>
                  <img
                    src={`${image_URL}${company.logo_path}`}
                    alt={company.name}
                  />
                  <p>{company.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
