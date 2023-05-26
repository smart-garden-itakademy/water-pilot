const express = require('express');
const router = express.Router();
const {getElectrovalve,addElectrovalve,updateElectrovalve,deleteElectrovalve,isValvePositionAlreadyInDb} = require ('../controllers/ElectrovalveController');
const {authenticate} = require ('../middlewares/AuthMiddleware');
const {CustomError} = require ('../errors/CustomError')
const {checkArgumentsDefined,checkArgumentsType} = require ('../controllers/utils/Utils')

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

    .post(authenticate,async (req,res,next) => {
        console.log("userId",req.userId);
        let { pinPosition, name } = req.body;
        pinPosition = parseInt(pinPosition)

        try {
            //vérifier que les arguments sont bien définis et du bon type
            checkArgumentsDefined(pinPosition,name);
            checkArgumentsType(next,pinPosition,"number",name,"string");

            //vérifier que la position de l'éléctrovanne n'est pas déjà prise
            const PositionAlreadyInDB =await isValvePositionAlreadyInDb(req.userId, pinPosition);
            if(PositionAlreadyInDB) throw new CustomError ("Une électrovanne existe déjà à cette position.",500)

            //enregistrement de l'electrovalve, isAutomatic est true par défaut
            const addValve = await addElectrovalve(req.userId,pinPosition,name,isAutomatic=true);
            res.status(200).json(addValve)
        } catch (err) {
            next(err);
            return
        }
        //TODO: optionnel:vérifier que le nom de l'éléctrovanne n'est pas déjà pris

    //     if(pinPosition && name){
    //         try{
    //
    //             addValve ? res.status(200).json(addValve) : res.status(400).json({"errorMsg": "Une électrovanne existe déjà à cette position."});
    //         }catch(err){
    //             res.status(400).json({"errorMsg":err})
    //         }
    //     }else res.status(400).json({"errorMsg":"la position de l'éléctrovanne et son nom doivent être renseignés"})
    //
        //
        }
    )
router.route('/:idValve')
    .patch(authenticate,async (req,res) => {
        console.log(req.params)
        //TODO: ajouter isAutomatic
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