import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import styles from '../css/BoardPage.module.css';
import Header from '../components/Header';

const BoardPage = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!gender || !age || !title || !review || rating === 0) {
      alert('모든 항목을 입력해주세요');
      return;
    }
  
    try {
      const response = await axios.post('/api/review', {
        gender,
        age,
        title,
        review,
        rating,
      });
  
      // API 응답의 success 속성 확인
      if (response.data.success) {
        alert('정상적으로 제출되었습니다\n 작성해주셔서 감사합니다!');
        // 입력 필드 초기화
        setGender('');
        setAge('');
        setTitle('');
        setReview('');
        setRating(0);
      } else {
        alert('후기 제출에 실패했습니다: ' + response.data.message);
      }
    } catch (error) {
      console.error('후기 제출 실패:', error);
      alert('후기 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };
  
  return (
    <>
      <Header />
      <div className={styles.container}>
      <h2 className={styles.h2}>후기 및 건의사항</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <span className={styles.label}>성별</span>
            <div className={styles.genderCheckboxes}>
              <label className={styles.genderLabel}>
                <input
                  type="checkbox"
                  checked={gender === 'M'}
                  onChange={() => setGender(gender === 'M' ? '' : 'M')}
                />
                남
              </label>
              <label className={styles.genderLabel}>
                <input
                  type="checkbox"
                  checked={gender === 'F'}
                  onChange={() => setGender(gender === 'F' ? '' : 'F')}
                />
                여
              </label>
            </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="age">연령</label>
          <div className={styles.widthBox}>
            <select
              className={styles.ageBox}
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              >
                <option value="" disabled>나이대 선택</option>
                <option value="20">20대</option>
                <option value="30">30대</option>
                <option value="40">40대</option>
                <option value="50">50대 이상</option>
            </select>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            placeholder='20자 이내'
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
          <div className={styles.widthBox}>
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
        <button type="submit" className={styles.submit}>제출하기</button>
      </form>
    </div>
    </>
  );
};

export default BoardPage;
