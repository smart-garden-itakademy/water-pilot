const express = require('express');
const router = express.Router();
const electrovalveController = require ('../controllers/ElectrovalveController');
const {authenticate} = require ('../controllers/UserController');

router.route('/')
    .post(authenticate,async (req,res) => {
        console.log("userId",req.userId);
        const { pinPosition, name } = req.body;
        if(pinPosition && name){
            try{
                const addElectrovalve = await electrovalveController.addElectrovalve(req.userId,pinPosition,name);
                console.log(addElectrovalve);
                if (addElectrovalve === true) { // vérifie si l'ajout a réussi
                    res.status(200).end();
                } else {
                    console.log(addElectrovalve)
                    res.status(400).json({"msg": "Une électrovanne existe déjà à cette position."}); // renvoie une erreur si l'ajout a échoué
                }
            }catch(err){
                res.status(400).json({"msg":"Un problème est survenu lors de l'enregistrement de l'éléctrovalve:"+err})
            }
        }else res.status(400).json({"msg":"la position de l'éléctrovanne et son nom doivent être renseignés"})
    })
    .get(authenticate,async (req,res) => {
        try{
            const getElectrovalve = await electrovalveController.getElectrovalve(req.userId);
            res.status(200).json(getElectrovalve)
        }catch(err){
            res.status(400).json({"msg":"Un problème est survenu lors de la récupération des l'éléctrovalves:"+err})
        }
    })
    .patch(authenticate,async (req,res) => {
        const { name, pinPosition } = req.body;
        try{
            const putElectrovalve = await electrovalveController.updateElectrovalve(name,req.userId,pinPosition);
            res.status(200).json(putElectrovalve)
        }catch(err){
            res.status(400).json({"msg":"Un problème est survenu lors de la modification de l'éléctrovalve:"+err})
        }
    })
    .delete(authenticate,async (req,res) => {
        const { pinPosition } = req.body;
        if(pinPosition){
            try{
                const deleteElectrovalve = await electrovalveController.deleteElectrovalve(pinPosition, req.userId);
                res.status(200).json(deleteElectrovalve)
            }catch(err){
                res.status(400).json({"msg":"Un problème est survenu lors de la suppression de l'éléctrovalve:"+err})
            }
        }else res.status(400).json({"msg":"l'éléctrovanne n'est pas identifiée"})
    })

module.exports=router;