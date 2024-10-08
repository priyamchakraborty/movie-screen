import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "./MovieCard.module.scss";

const MovieCard = ({ movie, toggleFavorite, isFavorite }) => {
  // Get the navigate function from the react-router-dom package
  const navigate = useNavigate();

  // Destructure the movie object
  const { id, poster_path, title, vote_average, release_date } = movie;

  // Format the release_date, vote_average, and vote_average to display on the card
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
    <div className={styles.movieCard} key={id}>
      <div
        className={styles.favoriteIcon}
        onClick={e => {
          e.stopPropagation();
          // Pass the id of the movie to the toggleFavorite function
          toggleFavorite(id);
        }}
      >
        {isFavorite ? (
          <FaHeart className={styles.favorite} />
        ) : (
          <FaRegHeart className={styles.notFavorite} />
        )}
      </div>
      <div className={styles.card} onClick={() => navigate(`/movie/${id}`)}>
        <div className={styles.moviePoster}>
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}${poster_path}`}
            alt={title}
          />
        </div>
        <div className={styles.info}>
          <div>
            <h4>
              {title &&
                (title.length > 20 ? title.substring(0, 20) + "..." : title)}
            </h4>
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
    </div>
  );
};

export default MovieCard;
