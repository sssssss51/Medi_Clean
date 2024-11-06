const express = require('express');
const router = express.Router();
const { saveReview } = require('../controllers/reviewController');
const { listReview } = require('../controllers/listController');

router.post('/review', saveReview);
router.post('/list', listReview);

module.exports = router;
