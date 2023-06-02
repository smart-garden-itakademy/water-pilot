const express = require('express');
const router = express.Router();
const {isSettingInDb,addValveSetting,getValveSetting,deleteValveSetting,updateValveSetting} = require ('../controllers/ValveSettingController');
const {authenticate} = require ('../middlewares/AuthMiddleware');
const {checkArgumentsDefined,checkArgumentsType} = require ('../controllers/Utils/Utils')
const {CustomError} = require ('../errors/CustomError')
const {isElectrovalveExist} = require ('../controllers/ElectrovalveController');


router.route('/')
    .post(authenticate,async (req,res,next) => {
        const rainThreshold = parseInt(req.body.rainThreshold);
        const moistureThreshold = parseInt(req.body.moistureThreshold);
        const duration = parseInt(req.body.duration);

            try{
                //vérifier que les arguments sont bien définis et du bon type
                checkArgumentsDefined(rainThreshold, moistureThreshold, duration);
                checkArgumentsType(rainThreshold,"number",moistureThreshold,"number",duration,"number",req.idValve,"number");
                //vérifier que l'éléctrovalve existe bien pour cet utilisateur
                const isValveExist = await isElectrovalveExist(req.idValve, req.userId);
                if(!isValveExist) next (new CustomError ("Cette électrovanne n'existe pas",500));
                //vérifier que le setting n'existe pas déjà
                const isSettingAlreadyExist = await isSettingInDb(req.idValve);
                if(isSettingAlreadyExist) next (new CustomError ("Une configuration existe déjà pour cette électrovanne",500));

                const addSetting = await addValveSetting(rainThreshold, moistureThreshold, duration, req.idValve);
                res.status(200).json(addSetting)
            }catch(err){
                next(err);
                return
            }
    })
    
    .get(authenticate,async (req,res,next) => {
        try{
            checkArgumentsType(req.idValve,"number")
            //vérifier que l'éléctrovalve existe bien pour cet utilisateur
            const isValveExist = await isElectrovalveExist(req.idValve, req.userId);
            if(!isValveExist) next (new CustomError ("Cette électrovanne n'existe pas",500));

            const getSetting= await getValveSetting(req.idValve);
            res.status(200).json(getSetting)
        }catch(err){
            next(err);
            return
        }
    })
    .delete (authenticate,async (req,res,next) => {
        try {
            checkArgumentsType(req.idValve,"number")
            //vérifier que l'éléctrovalve existe bien pour cet utilisateur
            const isValveExist = await isElectrovalveExist(req.idValve, req.userId);
            if(!isValveExist) next (new CustomError ("Cette électrovanne n'existe pas",500));
            //vérifier que le setting existe bien
            const isSettingAlreadyExist = await isSettingInDb(req.idValve);
            if(!isSettingAlreadyExist) next (new CustomError ("Aucune configuration n'a été trouvée pour cette électrovanne",500));

            const deleteSettings = await deleteValveSetting(req.idValve, req.userId);
            console.log("deleteSettings",deleteSettings)
            res.status(200).json(deleteSettings)
        }catch (err) {
            next(err);
            return
        }
    })

    .put (authenticate,async (req,res,next) => {

        const rainThreshold = parseInt(req.body.rainThreshold);
        const moistureThreshold = parseInt(req.body.moistureThreshold);
        const duration = parseInt(req.body.duration);

        try{
            //TODO: créer une fonction qui fasse tous les checks (code dupliqué)
            //vérifier que les arguments sont bien définis et du bon type
            checkArgumentsDefined(rainThreshold, moistureThreshold, duration);
            checkArgumentsType(rainThreshold,"number",moistureThreshold,"number",duration,"number",req.idValve,"number");
            //vérifier que l'éléctrovalve existe bien pour cet utilisateur
            const isValveExist = await isElectrovalveExist(req.idValve, req.userId);
            if(!isValveExist) next (new CustomError ("Cette électrovanne n'existe pas",500));
            //vérifier que le setting existe bien
            const isSettingAlreadyExist = await isSettingInDb(req.idValve);
            if(!isSettingAlreadyExist) next (new CustomError ("Aucune configuration n'a été trouvée pour cette électrovanne",500));

            const updateSetting = await updateValveSetting(rainThreshold, moistureThreshold, duration,req.idValve)
            res.status(200).json(updateSetting)
        }catch(err){
            next(err);
            return
        }
    })

module.exports=router;