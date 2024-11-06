import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import Header from '../components/Header';
import styles from '../css/MainPage.module.css'; // 모듈 CSS 가져오기

const MainPage = () => {
  const navigate = useNavigate(); // navigate 함수 사용

  const handleNavigation = (path) => {
    navigate(path); // path로 이동
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.mainContent}>
          <section className={styles.sectionContentBox}>
            <h2 className={styles.sectionTitle}>메디클린이란?</h2>
            <p className={styles.sectionText}>
              메디클린은 버려지는 폐의약품으로 고통받는 사람들과 동식물들을 지키기 위해 올바른 처리 방법을 알려주기 위하여 제작된 페이지입니다
            </p>
          </section>
          
          <div className={styles.findNearbyButton} onClick={() => handleNavigation('/find-nearby')}>
            가까운 수거함 찾기 →
          </div>

          <div className={styles.buttonContainer}>
            <div
              className={styles.button}
              onClick={() => window.open('https://www.hira.or.kr/rb/dur/form.do?pgmid=HIRAA050300000100', '_blank')}
            >
              건강보험심사평가원<br />내가 먹는 약, 한눈에!
            </div>
            <div
              className={styles.button}
              onClick={() => handleNavigation('/guidePage')}
            >
              분류방법
            </div>
            <div
              className={styles.button}
              onClick={() => handleNavigation('/boardPage')}
            >
              후기 및 건의사항
            </div>
            <div
              className={styles.button}
              onClick={() => handleNavigation('/videos')}
            >
              홍보 영상 및 포스터
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MainPage;
