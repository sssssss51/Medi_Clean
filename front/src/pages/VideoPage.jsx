import React from 'react';
import Header from '../components/Header';
import styles from '../css/VideoPage.module.css';

const VideoPage = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.comingSoonText}>곧 출시됩니다</h1>
      </div>
    </>
  );
};

export default VideoPage;
