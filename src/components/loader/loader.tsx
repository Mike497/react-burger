import styles from './loader.module.css';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <p className="text text_type_main-default mt-4">Загрузка...</p>
    </div>
  );
};

export default Loader;