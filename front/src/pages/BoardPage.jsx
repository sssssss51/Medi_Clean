import React, { useState } from 'react';
import styles from '../css/BoardPage.module.css';
import Header from '../components/Header';

const BoardPage = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 후기를 제출하는 로직 (예: API 호출)
    console.log({ name, review, rating });
    // 입력 필드 초기화
    setName('');
    setTitle('');
    setReview('');
    setRating(0);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
      <h2 className={styles.h2}>후기 및 건의사항</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">별명</label>
          <input
            type="text"
            id="name"
            placeholder='10글자 이내'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="review">후기 내용</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div className={styles.rating}>
          <span className={styles.label}>별점</span>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`${styles.star} ${rating >= star ? styles.filled : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button type="submit">제출하기</button>
      </form>
    </div>
    </>
  );
};

export default BoardPage;
