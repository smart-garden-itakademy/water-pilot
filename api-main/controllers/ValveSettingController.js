const {getValveSettingInDb, addValveSettingInDb, deleteValveSettingInDb, updateValveSettingInDb} = require ('../models/valveSettingModel');
const {isValveNotInDb, giveValvePostion} = require ('../controllers/ElectrovalveController');

const isSettingInDb = async (userId, idElectrovalve) => {
    const getSettings = await getValveSetting (idElectrovalve,userId);
    if(getSettings.find(e => e.idElectrovalve == idElectrovalve)){
        return true
    }else false
}
const getValveSetting = async (idValve,userId) => {
    //stop if this idValve not belongs this user Id
    const valvePosition = await giveValvePostion(userId, idValve);
    if (!valvePosition.exists){
        throw new Error ("this electrovalve is unknown.")
    }
    try{
        return getValveSettingInDb(idValve);
    }catch(e){
        throw new Error(e)
    }
}
const addValveSetting = async (rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve, userId) => {

    //stop if this id Electrovalve not belongs this user
    const valvePosition = await giveValvePostion(userId, idElectrovalve);
    if (!valvePosition.exists){
        return {errorMsg: "this electrovalve is unknown."}
    }
    //stop if settings already exist on this valve
    const alreadyInDb = await isSettingInDb(userId, idElectrovalve);
    if(alreadyInDb) {
        return {errorMsg: "A setting already exist on this electrovalve."}
    }

    try {
        const addSettingsInDb = await addValveSettingInDb(rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve);
        let response = {
            idSettings: addSettingsInDb.insertId,
            rainThreshold: rainThreshold,
            moistureThreshold:moistureThreshold,
            duration: duration,
            isAutomatic: isAutomatic,
            idElectrovalve: idElectrovalve,
            errorMsg: ""
        }
        return response
    } catch (e) {
        throw new Error(e);
    }
}
const deleteValveSetting = async (idElectrovalve,userId) => {
    //stop if this id Electrovalve not belongs this user
    const valvePosition = await giveValvePostion(userId, idElectrovalve);
    console.log("valvePosition",valvePosition)
    if (!valvePosition.exists){
        console.log("la");
        return {"errorMsg":valvePosition.errmsg}
    }

    //stop if settings doesn't exist on this valve
    const isInDb = await isSettingInDb(userId, idElectrovalve);
    if(!isInDb) {
        return {"errorMsg": "This id settings doesn't exist."}
    }

    try {
        const deleteInDb = await deleteValveSettingInDb(idElectrovalve);
        console.log()
        if (deleteInDb.affectedRows) {
            return {"msg": `Les settings de l'éléctrovalve qui a pour ID: ${idElectrovalve} ont été supprimés avec succès`,
                "errorMsg":""}
        } else {
            return {"errorMsg": 'settings not found'}
        }
    }catch (e) {
        throw new Error (e);
    }
}
const updateValveSetting = async (rainThreshold, moistureThreshold, duration, isAutomatic,userId,idElectrovalve) => {
    //check if idElectrovalve exist and belongs this userId
    const valvePosition = await giveValvePostion(userId, idElectrovalve);
    //TODO: check if settings already exist on this valve

    if (valvePosition.exists){
        try {
            await updateValveSettingInDb(rainThreshold, moistureThreshold, duration, isAutomatic,idElectrovalve);
            return ({
                msg:`Les settings de l'éléctrovalve ${idElectrovalve} appartenant à l'utilisateur ${userId} sont mis à jour`,
                errorMsg:""
            })
        }catch (e) {
            throw new Error (e);
        }
    }else{
        return ({errorMsg:valvePosition.errmsg})
    }
}


module.exports={getValveSetting,addValveSetting,deleteValveSetting, updateValveSetting}