const express = require('express');
const router = express.Router();
const {addValveSetting,getValveSetting,deleteValveSetting,updateValveSetting} = require ('../controllers/valveSettingController');
const {authenticate} = require ('../controllers/UserController');

router.route('/')
    .post(authenticate,async (req,res) => {
        const {rainThreshold, moistureThreshold, duration, isAutomatic} = req.body;
        if(rainThreshold && moistureThreshold && duration && isAutomatic){
            try{
                const addSetting = await addValveSetting(rainThreshold, moistureThreshold, duration, isAutomatic, req.idValve, req.userId);
                if (addSetting.errorMsg) throw new Error (addSetting.errorMsg);
                res.status(200).json(addSetting)
            }catch(err){
                res.status(400).json(`${err}`)
            }
        }else res.status(400).json({"error":"tous les champs doivent être remplis: rainThreshold, moistureThreshold, duration, isAutomatic"})
    })
    
    .get(authenticate,async (req,res) => {
        try{
            const getSetting= await getValveSetting(req.idValve,req.userId);
            res.status(200).json(getSetting)
        }catch(err){
            res.status(400).json(`${err}`)
        }
    })
    router.route('/:idSettings')
    .delete (authenticate,async (req,res) => {
        const idSettings = parseInt (req.params.idSettings)
        try {
            const deleteSettings = await deleteValveSetting(req.idValve,idSettings, req.userId);
            console.log("deleteSettings",deleteSettings)
            if(deleteSettings.errorMsg) throw new Error (deleteSettings.errorMsg);
            res.status(200).json(deleteSettings.msg)
        }catch (err) {
            res.status(400).json(`${err}`)
        }
    })
    .put (authenticate,async (req,res) => {
        const {rainThreshold, moistureThreshold, duration, isAutomatic, idValveSetting, idElectrovalve} = req.body;
        try{
            const updateValveSetting = await updateValveSetting(rainThreshold, moistureThreshold, duration, isAutomatic, idValveSetting, req.userId,idElectrovalve)
            res.status(200).json(updateValveSetting)
        }catch(e){
            res.status(400).json({"msg":"Un problème est survenu lors de la modification des paramètres de l'éléctrovalve:"+e})
        }
    })

module.exports=router;