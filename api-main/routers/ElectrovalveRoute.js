const express = require('express');
const router = express.Router();
const {updateValveIsAutomatic,updateValveName,isValveNameAlreadyInDb,getElectrovalve,addElectrovalve,deleteElectrovalve,isValvePositionAlreadyInDb} = require ('../controllers/ElectrovalveController');
const {authenticate} = require ('../middlewares/AuthMiddleware');
const {CustomError} = require ('../errors/CustomError')
const {checkArgumentsDefined,checkArgumentsType} = require ('../controllers/utils/Utils')

router.route('/')
    //renvoi toutes les éléctrovalves
    .get(authenticate,async (req,res,next) => {
        try{
            const getValve = await getElectrovalve(req.userId);
            res.status(200).json(getValve)
        }catch(err){
            next(err);
            return
        }
    })

    .post(authenticate,async (req,res,next) => {
        console.log("userId",req.userId);
        let { pinPosition, name } = req.body;
        pinPosition = parseInt(pinPosition)

        try {
            //vérifier que les arguments sont bien définis et du bon type
            checkArgumentsDefined(pinPosition,name);
            checkArgumentsType(pinPosition,"number",name,"string");

            //vérifier que la position de l'éléctrovanne n'est pas déjà prise
            const PositionAlreadyInDB =await isValvePositionAlreadyInDb(req.userId, pinPosition);
            if(PositionAlreadyInDB) throw new CustomError ("Une électrovanne existe déjà à cette position.",500);

            const isNameAlreadyExist = isValveNameAlreadyInDb(req.userId, name);
            if(isNameAlreadyExist) throw new CustomError ("Un circuit d'arrosage existe déjà avec ce nom.",500);
            //enregistrement de l'electrovalve, isAutomatic est true par défaut
            const addValve = await addElectrovalve(req.userId,pinPosition,name,isAutomatic=true);
            res.status(200).json(addValve)
        } catch (err) {
            next(err);
            return
        }
    })
router.route('/:idValve')
    .patch(authenticate,async (req,res,next) => {
        console.log(req.params);
        //TODO: faire les vérifications de type et de valeur de idElectrovalve
        const idElectrovalve = parseInt(req.params.idValve) ;
        let { name, isAutomatic } = req.body;
        console.log("name",name,"isAutomatic",isAutomatic)
        //route utilisée pour modifier le nom ou isAutomatique d'une electrovanne
        try{
            if(name){
                checkArgumentsDefined(name);
                checkArgumentsType(name,"string");
                await updateValveName(req.userId,idElectrovalve,name)
            }
            if(isAutomatic){
                checkArgumentsDefined(isAutomatic);
                let boolIsAutomatic = isAutomatic.toLowerCase()==="true";//converti en boolean
                checkArgumentsType(boolIsAutomatic,"boolean");
                await updateValveIsAutomatic(req.userId,idElectrovalve,boolIsAutomatic)
            }
            res.status(200).json({"msg":"modification effectuée"})
        }catch (err){
            next(err);
            return
        }
    })
    .delete(authenticate,async (req,res,next) => {
        //TODO: faire les vérifications de type et de valeur de idElectrovalve
        //TODO: vérifier que l'electrovanne existe bien
        const idElectrovalve = parseInt(req.params.idValve) ;
            try{
                const deleteValve = await deleteElectrovalve(idElectrovalve, req.userId);
                console.log(deleteValve);
                if(deleteValve.errMsg) throw new Error (deleteValve.errMsg)
                res.status(200).json(deleteValve.msg)
            }catch(err){
                next(err);
                return
            }
    })

module.exports=router;