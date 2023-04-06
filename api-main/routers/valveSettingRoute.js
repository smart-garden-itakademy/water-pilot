const express = require('express');
const router = express.Router();
const valveSettingController = require ('../controllers/valveSettingController');
const userController = require ('../controllers/UserController');

router.route('/')
    .post(userController.authenticate,async (req,res) => {
        const {rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve} = req.body;
        try{
            const addValveSetting = await valveSettingController.addValveSetting(rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve);
            res.status(200).json(addValveSetting)
        }catch(err){
            res.status(400).json({"msg":"Un problème est survenu lors de l'enregistrement des paramètres de l'éléctrovalve:"+err})
        }
    })
    
    .get(userController.authenticate,async (req,res) => {
        try{
            const getValveSetting= await valveSettingController.getValveSetting(req.userId);
            res.status(200).json(getValveSetting)
        }catch(err){
            res.status(400).json({"msg":"Un problème est survenu lors de l'obtention des paramètres des éléctrovalves:"+err})
        }
    })


module.exports=router;