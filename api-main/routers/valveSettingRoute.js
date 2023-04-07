const express = require('express');
const router = express.Router();
const valveSettingController = require ('../controllers/valveSettingController');
const userController = require ('../controllers/UserController');

router.route('/')
    .post(userController.authenticate,async (req,res) => {
        const {rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve} = req.body;
        try{
            const addValveSetting = await valveSettingController.addValveSetting(rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve, req.userId);
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
    .delete (userController.authenticate,async (req,res) => {
        const {idElectrovalve,idValveSetting} = req.body;
        try {
            const deleteValveSetting = valveSettingController.deleteValveSetting(idElectrovalve,idValveSetting, req.userId);
            res.status(200).json(deleteValveSetting)
        }catch (e) {
            res.status(400).json({"msg":"Un problème est survenu lors de la suppression des paramètres de l'éléctrovalve:"+e})
        }
    })
    .put (userController.authenticate,async (req,res) => {
        const {rainThreshold, moistureThreshold, duration, isAutomatic, idValveSetting, idElectrovalve} = req.body;
        try{
            const updateValveSetting = await valveSettingController.updateValveSetting(rainThreshold, moistureThreshold, duration, isAutomatic, idValveSetting, req.userId,idElectrovalve)
            console.log(updateValveSetting);
            res.status(200).json(updateValveSetting)
        }catch(e){
            res.status(400).json({"msg":"Un problème est survenu lors de la modification des paramètres de l'éléctrovalve:"+e})
        }
    })

module.exports=router;