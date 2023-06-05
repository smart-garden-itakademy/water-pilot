const express = require('express');
const router = express.Router();
const {authenticate} = require ('../middlewares/AuthMiddleware');
const {getSchedules,addSchedule, deleteSchedule} = require ('../controllers/ScheduleController');
const {checkArgumentsDefined,checkArgumentsType} = require ('../controllers/Utils/Utils')
const {getIdSetting} = require ('../controllers/ValveSettingController')
router.route('/')
    .get(authenticate,async (req,res,next) => {
        const idSetting = await getIdSetting(req.idValve)

        try{
            const schedules = await getSchedules(idSetting);
            res.status(200).json(schedules)
        }catch(err){
            next(err);
        }
    })
    .post (authenticate,async (req,res,next) => {

        const days = req.body.days;
        const hourStart = parseInt(req.body.hourStart);
        const hourEnd = parseInt(req.body.hourEnd);
        const isActivated = req.body.isActivated.toLowerCase() === "true"; //converti en booléen
        const idSetting = await getIdSetting(req.idValve)

        try{
            checkArgumentsDefined(days,hourStart, hourEnd, isActivated);
            checkArgumentsType(hourStart,"number", hourEnd, "number", isActivated,"boolean")
            const schedule = await addSchedule(hourStart, hourEnd, days, idSetting,isActivated);
            res.status(200).json(schedule)
        }catch (err){
            next(err);
        }
    })
router.route('/:idSchedule')
    .delete(authenticate,async (req, res,next) => {
        req.idSchedule = parseInt(req.params.idSchedule) ;
        console.log('la')
        try {
            const deleteSc = await deleteSchedule (req.idSchedule);
            res.status(200).json({"msg":`la plannification id:${req.idSchedule} de l'éléctrovalve id: ${req.idValve} a été supprimée`})
        } catch (err){
           next(err);
        }
    })
    .put(authenticate,async (req,res,next) => {
        req.idSchedule = parseInt(req.params.idSchedule) ;

        const {hourStart, hourEnd, days} = req.body;
        try{
            const patchSchedule = await updateSchedule(hourStart, hourEnd, days, req.idSchedule, req.idSetting, req.idValve, req.userId);
            res.status(200).json(patchSchedule)
        }catch(err){
            next(err)
        }
    })

//TODO: route PUT
module.exports=router;