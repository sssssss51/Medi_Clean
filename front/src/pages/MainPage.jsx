import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../css/MainPage.module.css';
import icon1 from '../imgs/assessment.png';
import icon2 from '../imgs/seperate.png';
import icon3 from '../imgs/write.png';
import icon4 from '../imgs/adver.png';
import logo from '../imgs/logo.png';
import banner1 from '../imgs/001.png';
import banner2 from '../imgs/002.png';
import banner3 from '../imgs/003.png';
import arrow from '../imgs/arrow.png';

const MainPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [showRegions, setShowRegions] = useState(false);
  const listRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // 상태 토글
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const regions = [
    '경기도 안양시',
    '경기도 군포시',
    '경기도 부천시',
    '경기도 양주시',
    '경기도 용인시',
    '경기도 평택시',
    '서울특별시 관악구',
    '서울특별시 성북구',
    '서울특별시 서초구',
    '인천광역시 강화군',
    '인천광역시 계양구',
    '인천광역시 동구',
    '인천광역시 미추홀구'
  ];

  const handleShowRegions = () => {
    setShowRegions(!showRegions);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.mainContent}>
          <section className={styles.sectionContentBox}>
            <h2 className={styles.sectionTitle}>메디클린이란?</h2>
            <p className={styles.sectionText}>
              메디클린은 버려지는 폐의약품으로 고통받는 사람들과 동식물들을 지키기 위해 올바른 처리 방법을 알려주기 위해 제작된 페이지입니다.
            </p>
          </section>
          <div className={styles.findNearbyButton} onClick={() => handleNavigation('/mapPage')}>
            가까운 수거함 찾기 →
          </div>
          <div className={styles.list}>
            현재 일부 지역만 가능합니다{' '}
            <span className={styles.regionLink} onClick={handleShowRegions}>
              지역 목록 보기
            </span>
          </div>
          {showRegions && (
            <div className={styles.regionList} ref={listRef}>
              <ul>
                {regions.map((region, index) => (
                  <li key={index}>{region}</li>
                ))}
              </ul>
            </div>
          )}
          <div className={styles.buttonContainer}>
            <div
              className={styles.button}
              onClick={() => window.open('https://www.hira.or.kr/rb/dur/form.do?pgmid=HIRAA050300000100', '_blank')}
            >
              <img src={icon1} className={styles.icon} alt="icon" />
              건강보험심사평가원
            </div>
            <div className={styles.button} onClick={() => handleNavigation('/guidePage')}>
              <img src={icon2} className={styles.icon} alt="icon" />
              분류방법
            </div>
            <div className={styles.button} onClick={() => handleNavigation('/boardPage')}>
              <img src={icon3} className={styles.icon} alt="icon" />
              후기 및 건의사항
            </div>
            <div
              className={styles.button}
              onClick={() => window.open('https://www.youtube.com/watch?v=N1dBNn_lFhM', '_blank')}
            >
              <img src={icon4} className={styles.icon} alt="icon" />
              홍보 영상 및 포스터
            </div>
          </div>
          <div className={styles.bannerBox}>
            <img src={banner1} alt="banner1" />
            <img src={banner2} alt="banner2" />
            <img src={banner3} alt="banner3" />
          </div>
          <p className={styles.tab} onClick={() => window.open('https://nedrug.mfds.go.kr/index', '_blank')}>
            의약품안전나라 바로가기
            <img src={arrow} className={styles.arrow} alt="arrow" />
          </p>
        </main>
        <button onClick={toggleVisibility} className={styles.hiddenBtn}>폐의약품 분리배출 정보 보기</button>
          <div style={{ display: isVisible ? 'block' : 'none' }}>
            <h2>폐의약품 분리배출 정보</h2>
            <p>폐의약품, 폐의약품 분리배출, 의약품 수거함, 수거함, 폐의약품 어디다가, 폐의약품 어디</p>
          </div>
        <footer className={styles.footer}>
          <p className={styles.leftAlign}>대림대학교 응용SW전공 카푸발바닥젤리세개팀</p>
          <p className={styles.leftAlign}>주소: 경기도 안양시 동안구 임곡로 29</p>
          <p className={styles.leftAlign}>Email: belin9631@naver.com</p>
          <p className={styles.centerAlign}>&copy; 2024 Mediclean. All Rights Reserved.</p>
          <img src={logo} alt="logo" className={styles.logo} />
        </footer>
      </div>
    </>
  );
};

export default MainPage;
