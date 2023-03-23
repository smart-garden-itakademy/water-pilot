const express = require('express');
const router = express.Router();

//get pressure
router.route('/pressure')
    .get((req,res) => {
        res.send.json({"pressure":100});
        res.status(200)
    })

//get temperature


//get humidity


//get soilmoisture


//start irrigation


//stop irrigation

