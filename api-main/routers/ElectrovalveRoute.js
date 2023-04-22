const express = require('express');
const router = express.Router();
const electrovalveController = require ('../controllers/ElectrovalveController');
const {authenticate} = require ('../controllers/UserController');
const valveSettingsRoute = require ('./ValveSettingsRoute');
const app = express();

app.use('/:id/valveSettings', valveSettingsRoute);


router.route('/')
    //renvoi toutes les éléctrovalves
    .get(authenticate,async (req,res) => {
        try{
            const getElectrovalve = await electrovalveController.getElectrovalve(req.userId);
            res.status(200).json(getElectrovalve)
        }catch(err){
            res.status(400).json({"msg":"Un problème est survenu lors de la récupération des l'éléctrovalves:"+err})
        }
    })

    .post(authenticate,async (req,res) => {
        console.log("userId",req.userId);
        const { pinPosition, name } = req.body;
        if(pinPosition && name){
            try{
                const addElectrovalve = await electrovalveController.addElectrovalve(req.userId,pinPosition,name);
                console.log("addElectrovalve",addElectrovalve);
                if (addElectrovalve) { // vérifie si l'ajout a réussi
                    res.status(200).json({
                        "id":addElectrovalve.affectedRows,
                        "name":name,
                        "position":pinPosition,
                        "userId":req.userId
                    });
                } else res.status(400).json({"msg": "Une électrovanne existe déjà à cette position."}); // renvoie une erreur si l'ajout a échoué

            }catch(err){
                res.status(400).json({"msg":"Un problème est survenu lors de l'enregistrement de l'éléctrovalve:"+err})
            }
        }else res.status(400).json({"msg":"la position de l'éléctrovanne et son nom doivent être renseignés"})
    })
router.route('/:id')
    .patch(authenticate,async (req,res) => {
        const { name } = req.body;
        const idElectrovalve = parseInt(req.params.id) ;
        console.log(idElectrovalve)
        if(!name) {
            res.status(400).json({"error":"le nom du circuit d'arrosage doit être renseigné"});
            return
        }
        try{
            const putElectrovalve = await electrovalveController.updateElectrovalve(name,req.userId,idElectrovalve);
            res.status(200).json(putElectrovalve)
        }catch(err){
            res.status(400).json({"msg":"Un problème est survenu lors de la modification de l'éléctrovalve:"+err})
        }
    })
    .delete(authenticate,async (req,res) => {
        const idElectrovalve = parseInt(req.params.id) ;
            try{
                const deleteElectrovalve = await electrovalveController.deleteElectrovalve(idElectrovalve, req.userId);
                res.status(200).json(deleteElectrovalve)
            }catch(err){
                res.status(400).json({"msg":"Un problème est survenu lors de la suppression de l'éléctrovalve:"+err})
            }
    })

module.exports=router;