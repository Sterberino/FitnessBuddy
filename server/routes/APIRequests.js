const express = require('express');
const router = express.Router();

const {FoodSearch, ExerciseSearch} = require('../controllers/APIRequests.js');

router.route('/food').get(FoodSearch)
router.route('/exercise').get(ExerciseSearch)

module.exports = router;