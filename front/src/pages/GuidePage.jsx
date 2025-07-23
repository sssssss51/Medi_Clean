import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import styles from '../css/GuidePage.module.css'; // 모듈 CSS 가져오기
import Header from '../components/Header';
import medi1 from '../imgs/medi1.png';
import medi2 from '../imgs/medi2.png';
import medi3 from '../imgs/medi3.png';
import medi4 from '../imgs/medi4.png';

const MethodPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <>
      <Header />
      <section className={styles.mainContent}>
        <h2>폐의약품 분류 방법</h2>
        <p className={styles.impo}>건강기능식품은 수거 대상이 아닙니다</p>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img src={medi1} alt="알약" />
            <h4>알약</h4>
            <p>포장된 비닐, 종이 등을 제거한 후 내용물만 봉투에 담아 배출</p>
          </div>
          <div className={styles.card}>
            <img src={medi4} alt="알약" />
            <h4>가루약</h4>
            <p>포장지를 뜯지 않고 그대로 배출</p>
          </div>
          <div className={styles.card}>
            <img src={medi3} alt="알약" />
            <h4>물약(시럽)</h4>
            <p>한 병에 모은 후 새지 않도록 밀봉해 배출</p>
          </div>
          <div className={styles.card}>
            <img src={medi2} alt="알약" />
            <h4>안약, 연고, 바르는 물약</h4>
            <p>겉에 종이박스만 분리해 폐기하고 용기째 배출</p>
          </div>
        </div>
      </section>

      <section className={styles.indexSection}>
        <div className={styles.additionalInfo}>
          <p>폐의약품은 가까운 약국이나 보건소에 <br />설치된 수거함에 배출해주세요</p>
        </div>

        <div
          className={styles.findLocationBtn}
          onClick={() => navigate('/mapPage')} // 여기에서 직접 navigate 호출
        >
          가까운 수거함 찾기 ➔
        </div>
      </section>
    </>
  );
};

export default MethodPage;
