const {updateValveIsAutomaticInDb,updateValveNameInDb,addElectrovalveInDb,getElectrovalveInDb, deleteElectrovalveInDb} = require ('../models/ElectrovalveModel');
const {CustomError} = require ('../errors/CustomError')

//TODO : add a function to check if the valve is already in DB return ID if true
const isElectrovalveExist = async (idElectrovalve,userId) => {
    //send true if valve is in DB
    const getValves = await getElectrovalves(userId);
    console.log("getValves",getValves);
    return !!getValves.find(e => e.id === idElectrovalve)
}

const giveValvePostion = async (userId, idElectrovalve) => {
    const electrovalves = await getElectrovalves(userId);
    console.log("electrovalves",electrovalves)
    const valve = electrovalves.find(e => e.id === idElectrovalve);
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
    const getElectrovalves = await getElectrovalves(userId);
    if(getElectrovalves.find(e => e.name === name)){
        return true
    }else false
}
const isValvePositionAlreadyInDb = async (userId, pinPosition) => {
    //send true if position valve is in DB
    const getElectrovalves = await getElectrovalves(userId);
    if(getElectrovalves.find(e => e.position === pinPosition)){
        return true
    }else false
}
const addElectrovalve = async (userId, pinPosition, name, isAutomatic) => {
    try{
        const addValveInDb = await addElectrovalveInDb(userId,pinPosition,name,isAutomatic);
        console.log("addValveInDb ",addValveInDb )
        if (addValveInDb) { // si enregistrement ok formattage de la reponse
            return {
            id: addValveInDb.insertId,
            name: name,
            position: pinPosition,
            userId: userId
        };
        }
    }catch(err){
        throw new CustomError ("Impossible d'ajouter l'éléctrovalve.",500)
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
    }
}
const getElectrovalves = async (userId) => {
    try{
        return await getElectrovalveInDb(userId);
    }catch(e){
        throw new CustomError ("Impossible de récupérer les éléctrovalves.",500);
    }
}

const updateValveName = async (userId,idElectrovalve, name) => {
    try{
        return updateValveNameInDb(userId,idElectrovalve, name);
    }catch(e){
        throw new CustomError ("Impossible de mettre à jour le nom de l'éléctrovalve.",500);
    }
}
const updateValveIsAutomatic = async (userId,idElectrovalve, isAutomatic) => {
    try{
        return updateValveIsAutomaticInDb(userId,idElectrovalve, isAutomatic);
    }catch(e){
        throw new CustomError ("Impossible de mettre à jour le mode automatique de l'éléctrovalve.",500);
    }
}

module.exports={isElectrovalveExist,updateValveIsAutomatic,updateValveName,isValveNameAlreadyInDb,addElectrovalve,deleteElectrovalve, getElectrovalves, isValvePositionAlreadyInDb, giveValvePostion}