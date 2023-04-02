const express = require('express');
const router = express.Router();

const {FoodSearch} = require('../controllers/APIRequests.js');

router.route('/Food').get(FoodSearch)

module.exports = router;