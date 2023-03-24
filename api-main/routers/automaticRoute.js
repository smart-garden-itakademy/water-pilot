const express = require('express');
const router = express.Router();

const automaticController = require('../controllers/automaticController');

// Get userSettings by DB
const userSettings = automaticController.userSettings;

router.route('/automatic')
	.post((req, res) => {
		// ...
	})
  // Get result of automatic watering 
	.get((req, res) => {
    const result = automaticController.updateStateVariables(userSettings);
		res.status(200).send(`<pre>${result}</pre>`);
	});

module.exports = router;