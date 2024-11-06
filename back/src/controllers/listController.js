const pool = require('../config/db');

const listReview = async (req, res) => {
  try {
    // DB에서 가장 최신 10개의 리뷰를 가져오는 SQL 쿼리
    const sql = 'SELECT title, review, rating, created_time FROM board ORDER BY created_time DESC LIMIT 10';
    
    // DB에 쿼리 실행
    const [result] = await pool.execute(sql);

    // 성공적으로 데이터 가져온 경우
    return res.status(200).json({
      success: true,
      message: '가장 최신의 10개 리뷰를 가져왔습니다.',
      data: result,
    });

  } catch (error) {
    console.error('리뷰 가져오기 실패:', error);
    // 오류 발생 시
    return res.status(500).json({
      success: false,
      message: '리뷰 데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.',
    });
  }
};

module.exports = {
  listReview,
};
