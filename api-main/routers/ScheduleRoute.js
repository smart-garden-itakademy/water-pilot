const express = require('express');
const router = express.Router();
const {authenticate} = require ('../controllers/UserController');
const {getSchedules,addSchedule} = require ('../controllers/ScheduleController');

router.route('/')
    .get(async (req,res) => {
        const {idSettings} = req.body;
        try{
            const schedules = await getSchedules(idSettings);
            res.status(200).json(schedules)
        }catch(err){
            res.status(400).json({"msg":"Un problème est survenu lors de la récupération des plages horaires:"+err})
        }
    })

module.exports=router;