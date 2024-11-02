const express = require('express');
const router = express.Router();
const { saveReview } = require('../controllers/reviewController');

router.post('/review', saveReview);

module.exports = router;
