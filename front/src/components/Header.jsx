import React from 'react';
import styles from '../css/Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        Medi Clean
      </div>
      <nav className={styles.nav}>
        <div className={styles.navItem} onClick={() => navigate('/guidePage')}>분리배출표</div>
        <div className={styles.navItem} onClick={() => navigate('/mapPage')}>지도</div>
        <div className={styles.navItem} onClick={() => navigate('/boardPage')}>후기</div>
      </nav>
    </header>
  );
};

export default Header;
