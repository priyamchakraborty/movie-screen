import React from "react";
import { Circles } from "react-loader-spinner";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <Circles
      height="100"
      width="100"
      color="#3d5c9c"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass={styles.loader}
      visible={true}
    />
  );
};

export default Loader;
