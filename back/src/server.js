const express = require('express'); // Express 모듈 가져오기
const bodyParser = require('body-parser'); // 요청 본문 파싱을 위한 미들웨어
const reviewRoutes = require('./routes/reviewRoutes'); // 라우트 파일 가져오기
const dotenv = require('dotenv'); // 환경 변수 관리
const cors = require('cors'); // CORS 미들웨어
const morgan = require('morgan'); // 요청 로깅 미들웨어

dotenv.config(); // .env 파일의 환경 변수 로드

const app = express(); // Express 애플리케이션 인스턴스 생성
const PORT = process.env.PORT || 5000; // 포트 번호 설정

// 미들웨어 설정
app.use(cors()); // CORS 허용
app.use(bodyParser.json()); // JSON 파싱을 위한 미들웨어
app.use(morgan('dev')); // 요청 로깅 미들웨어

// 라우트 설정
app.use('/api', reviewRoutes);

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
