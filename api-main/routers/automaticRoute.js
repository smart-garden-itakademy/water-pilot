const express = require('express');
const router = express.Router();

const automaticController = require('../controllers/automaticController.test');

// Get userSettings by DB
const userSettings = automaticController.userSettings;
const externData = automaticController.externData;

router.route('/automatic')
	.post((req, res) => {
		// ...
	})
  // Get update of automatic watering 
	.get((req, res) => {
    const result = automaticController.updateStateVariables(userSettings, externData);
		res.status(200).send(`<pre>${result}</pre>`);
	});

module.exports = router;