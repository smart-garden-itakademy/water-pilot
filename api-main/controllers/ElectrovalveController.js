const electrovalveModel = require ('../models/ElectrovalveModel');

const giveValvePostion = async (userId, idElectrovalve) => {
    const getElectrovalves = await getElectrovalve(userId);
    //console.log('giveValve', getElectrovalves.find(e => e.id == idElectrovalve))
    if (getElectrovalves.find(e => e.id == idElectrovalve)){
        return getElectrovalves.find(e => e.id == idElectrovalve).position
    }else return false
}

const isValveNotInDb = async (userId, pinPosition) => {
    //send true if valve is not in DB
    const getElectrovalves = await getElectrovalve(userId);
    if(getElectrovalves.find(e => e.position == pinPosition)){
        return false
    }else return true
}
const addElectrovalve = async (userId, pinPosition, name) => {
    if(await isValveNotInDb(userId, pinPosition)){
        try{
            const addElectrovalveInDb = await electrovalveModel.addElectrovalveInDb(userId,pinPosition,name);
            return true;

        }catch(e){
            throw new Error("Unable to add electrovalve.Errormsg:"+e);
            return false
        }
    }else return false;
}
const deleteElectrovalve = (pinPosition, userId) => {
    try{
        return electrovalveModel.deleteElectrovalveInDb(pinPosition, userId);
    }catch(e){
        throw new Error("Unable to delete electrovalve.Errormsg:"+e)
    }
}
const getElectrovalve = (userId) => {
    try{
        return electrovalveModel.getElectrovalveInDb(userId);
    }catch(e){
        throw new Error("Unable to get electrovalves.Errormsg:"+e)
    }
}
const updateElectrovalve = (name,userId,pinPosition) => {
    try{
        return electrovalveModel.updateElectrovalveInDb(name,userId,pinPosition);
    }catch(e){
        throw new Error("Unable to rename electrovalve."+e)
    }
}

module.exports={addElectrovalve,deleteElectrovalve, getElectrovalve,updateElectrovalve, isValveNotInDb, giveValvePostion}