const express = require('express');
const router = express.Router();
const {getIrrigationStats, getSensorsStats}= require ('../controllers/StatsController')
const {authenticate} = require("../middlewares/AuthMiddleware");

//get irrigation stats
router.route('/irrigations')
    .get(authenticate, (req,res)=>{
        getIrrigationStats(req.userId)
            .then((data)=> res.json(data))
    })

//get sensors stats
router.route('/sensors')
    .get(authenticate, (req,res)=>{
        getSensorsStats()
            .then((data)=> res.json(data))
    })

module.exports=router;

