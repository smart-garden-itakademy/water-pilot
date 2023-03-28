const express = require('express');
const router = express.Router();

const automaticController = require('../controllers/automaticController');
const automaticModel = require('../models/automaticModel');

router.get('/test', automaticModel.testDbConnection);


module.exports = router;