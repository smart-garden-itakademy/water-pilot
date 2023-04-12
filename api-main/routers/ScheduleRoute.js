const express = require('express');
const router = express.Router();
const {authenticate} = require ('../controllers/UserController');
const {getSchedules,addSchedule, deleteSchedule} = require ('../controllers/ScheduleController');

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
    .post (async (req,res) => {
        const {hourStart, hourEnd, days, idSettings} = req.body;
        try{
            const schedule = await addSchedule(hourStart, hourEnd, days, idSettings);
            res.status(200).json(schedule)
        }catch (err){
            res.status(400).json({"msg":"Un problème est survenu lors de l'enregistrement des plages horaires:"+err})
        }
    })
    .delete(async (req, res) => {
        const {idSchedule} = req.body;
        try {
            const deleteSc = await deleteSchedule (idSchedule);
            res.status(200).json(deleteSc)
        } catch (err){
            res.status(400).json({"msg":"Un problème est survenu lors de la suppression des plages horaires:"+err})
        }
    })
module.exports=router;