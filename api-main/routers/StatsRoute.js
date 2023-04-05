const express = require('express');
const router = express.Router();
const StatsController = require ('../controllers/StatsController')

//get irrigation stats
router.route('/irrigations')
    .get((req,res)=>{
        StatsController.showIrrigationStats()
            .then((data)=> res.json(data))
    })

//get sensors stats
router.route('/sensors')
    .get((req,res)=>{
        StatsController.showSensorsStats()
            .then((data)=> res.json(data))
    })

module.exports=router;

