const express = require('express');
const router = express.Router();
const { saveReview } = require('../controllers/reviewController'); // 컨트롤러에서 후기 저장 함수 가져오기

// 후기 저장 엔드포인트
router.post('/review', saveReview); // 엔드포인트를 /api/reviews로 사용하려면

module.exports = router;
