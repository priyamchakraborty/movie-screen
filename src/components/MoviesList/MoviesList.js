import React from "react";
import styles from "./MoviesList.module.scss";
import Movies from "../Movies/Movies";

function MoviesList() {
  return (
    <div className={styles.listContainer}>
      <Movies />
    </div>
  );
}

export default MoviesList;
