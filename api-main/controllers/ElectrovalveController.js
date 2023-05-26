const {updateValveIsAutomaticInDb,updateValveNameInDb,addElectrovalveInDb,getElectrovalveInDb, deleteElectrovalveInDb} = require ('../models/ElectrovalveModel');
const {CustomError} = require ('../errors/CustomError')

//TODO : add a function to check if the valve is already in DB return ID if true


const giveValvePostion = async (userId, idElectrovalve) => {
    const electrovalves = await getElectrovalve(userId);
    console.log("electrovalves",electrovalves)
    const valve = electrovalves.find(e => e.id == idElectrovalve);
    console.log("valve",valve)
    //console.log('giveValve', getElectrovalves.find(e => e.id == idElectrovalve))
    if (valve) {
        return ({
            exists: true,
            position: valve.position,
            errmsg: ""
        })
    }else{
        return ({
            exists:false,
            position:null,
            errmsg:`Electrovalve with id ${idElectrovalve} does not exist or does not belong this user with id ${userId}`
        });
    }
}
const isValveNameAlreadyInDb = async (userId, name) => {
    //send true if name is in DB
    const getElectrovalves = await getElectrovalve(userId);
    if(getElectrovalves.find(e => e.name == name)){
        return true
    }else false
}
const isValvePositionAlreadyInDb = async (userId, pinPosition) => {
    //send true if position valve is in DB
    const getElectrovalves = await getElectrovalve(userId);
    if(getElectrovalves.find(e => e.position == pinPosition)){
        return true
    }else false
}
const addElectrovalve = async (userId, pinPosition, name, isAutomatic) => {
    try{
        const addValveInDb = await addElectrovalveInDb(userId,pinPosition,name,isAutomatic);
        console.log("addValveInDb ",addValveInDb )
        if (addValveInDb) { // si enregistrement ok formattage de la reponse
            let response={
                id:addValveInDb.insertId,
                name:name,
                position:pinPosition,
                userId:userId
            };
        return response;
        }
    }catch(err){
        throw new CustomError ("Impossible d'ajouter l'éléctrovalve.",500)
        return
    }
}
const deleteElectrovalve = async (idElectrovalve, userId) => {
    try {
        const deleteValveInDb = await deleteElectrovalveInDb(idElectrovalve, userId);

        if (deleteValveInDb.affectedRows) {
            return {msg: `L'éléctrovalve  qui a pour ID: ${idElectrovalve} a été supprimée avec succès`}
        }
    }catch(e){
        throw new CustomError ("Impossible de supprimer l'éléctrovalve.",500)
        return
    }
}
const getElectrovalve = (userId) => {
    try{
        return getElectrovalveInDb(userId);
    }catch(e){
        throw new CustomError ("Impossible de récupérer les éléctrovalves.",500);
        return
    }
}

const updateValveName = async (userId,idElectrovalve, name) => {
    try{
        return updateValveNameInDb(userId,idElectrovalve, name);
    }catch(e){
        throw new CustomError ("Impossible de mettre à jour le nom de l'éléctrovalve.",500);
        return
    }
}
const updateValveIsAutomatic = async (userId,idElectrovalve, isAutomatic) => {
    try{
        return updateValveIsAutomaticInDb(userId,idElectrovalve, isAutomatic);
    }catch(e){
        throw new CustomError ("Impossible de mettre à jour le mode automatique de l'éléctrovalve.",500);
        return
    }
}

module.exports={updateValveIsAutomatic,updateValveName,isValveNameAlreadyInDb,addElectrovalve,deleteElectrovalve, getElectrovalve, isValvePositionAlreadyInDb, giveValvePostion}