const express = require('express');
const router = express.Router();
const {getElectrovalve,addElectrovalve,updateElectrovalve,deleteElectrovalve} = require ('../controllers/ElectrovalveController');
const {authenticate} = require ('../middlewares/AuthMiddleware');

router.route('/')
    //renvoi toutes les éléctrovalves
    .get(authenticate,async (req,res) => {
        try{
            const getValve = await getElectrovalve(req.userId);
            res.status(200).json(getValve)
        }catch(err){
            res.status(400).json({"errorMsg":err})
        }
    })

    .post(authenticate,async (req,res) => {
        console.log("userId",req.userId);
        const { pinPosition, name } = req.body;
        if(pinPosition && name){
            try{
                const addValve = await addElectrovalve(req.userId,pinPosition,name);
                addValve ? res.status(200).json(addValve) : res.status(400).json({"errorMsg": "Une électrovanne existe déjà à cette position."});
            }catch(err){
                res.status(400).json({"errorMsg":err})
            }
        }else res.status(400).json({"errorMsg":"la position de l'éléctrovanne et son nom doivent être renseignés"})
    })
router.route('/:idValve')
    .patch(authenticate,async (req,res) => {
        console.log(req.params)
        const { name } = req.body;
        const idElectrovalve = parseInt(req.params.idValve) ;
        console.log(idElectrovalve)
        if(!name) {
            res.status(400).json({"errorMsg":"le nom du circuit d'arrosage doit être renseigné"});
            return
        }
        try{
            const putElectrovalve = await updateElectrovalve(name,req.userId,idElectrovalve);
            res.status(200).json(putElectrovalve)
        }catch(err){
            res.status(400).json({"errorMsg":err})
        }
    })
    .delete(authenticate,async (req,res) => {
        const idElectrovalve = parseInt(req.params.idValve) ;
            try{
                const deleteValve = await deleteElectrovalve(idElectrovalve, req.userId);
                console.log(deleteValve);
                if(deleteValve.errMsg) throw new Error (deleteValve.errMsg)
                res.status(200).json(deleteValve.msg)
            }catch(err){
                res.status(400).json({"errorMsg":err})
            }
    })

module.exports=router;