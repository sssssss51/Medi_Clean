const pool = require('../config/db');

const saveReview = async (req, res) => {
  try {
    const { gender, age, title, review, rating } = req.body;

    // DB에 후기를 저장하는 SQL 쿼리
    const sql = 'INSERT INTO board (gender, age, title, review, rating) VALUES (?, ?, ?, ?, ?)';
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
