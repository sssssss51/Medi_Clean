const mysql = require('mysql2/promise'); // mysql2/promise 모듈 가져오기
require('dotenv').config(); // 환경변수 로드

// MySQL 데이터베이스 연결 풀 설정
const pool = mysql.createPool({
    host: process.env.DB_HOST, // DB 호스트
    user: process.env.DB_USER, // DB 사용자
    password: process.env.DB_PASSWORD, // DB 비밀번호
    database: process.env.DB_NAME, // DB 이름
});

// 연결 확인 (선택 사항, 개발 중에만 사용)
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('DB에 성공적으로 연결되었습니다.');
        connection.release(); // 연결 반환
    } catch (err) {
        console.error('DB 연결 실패:', err);
    }
};

testConnection(); // 연결 테스트

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// 연결 풀을 모듈로 내보내기
module.exports = pool;
