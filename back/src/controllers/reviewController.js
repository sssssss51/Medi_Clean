const mysql = require('mysql2/promise'); // mysql2 패키지 가져오기

// MySQL 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST, // DB 호스트
  user: process.env.DB_USER, // DB 사용자
  password: process.env.DB_PASSWORD, // DB 비밀번호
  database: process.env.DB_NAME, // DB 이름
});

const saveReview = async (req, res) => {
  try {
    const { gender, age, title, review, rating } = req.body;

    // DB에 후기를 저장하는 SQL 쿼리
    const sql = 'INSERT INTO reviews (gender, age, title, review, rating) VALUES (?, ?, ?, ?, ?)';
    const values = [gender, age, title, review, rating];

    // DB에 쿼리 실행
    const [result] = await pool.execute(sql, values);

    // 성공적으로 저장된 경우
    return res.status(200).json({
      success: true,
      message: '후기가 성공적으로 저장되었습니다.',
      data: {
        id: result.insertId, // 새로 생성된 후기 ID 반환 (선택 사항)
      },
    });
  } catch (error) {
    console.error('후기 저장 실패:', error);
    // 오류 발생 시
    return res.status(500).json({
      success: false,
      message: '후기 저장 중 오류가 발생했습니다. 다시 시도해주세요.',
    });
  }
};

module.exports = {
  saveReview,
};
