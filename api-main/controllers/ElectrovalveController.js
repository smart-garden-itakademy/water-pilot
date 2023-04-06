const electrovalveModel = require ('../models/ElectrovalveModel');

const addElectrovalve = async (userId, pinPosition, name) => {
    //check if electrovalve already exist at this slot and if not it saves
    const getElectrovalves = await getElectrovalve(userId);
    if(!getElectrovalves.find(e => e.position == pinPosition)){
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
        throw new Error("Unable to delete electrovalve.Errormsg:"+e)
    }
}
const updateElectrovalve = (name,userId,pinPosition) => {
    try{
        return electrovalveModel.updateElectrovalveInDb(name,userId,pinPosition);
    }catch(e){
        throw new Error("Unable to rename electrovalve."+e)
    }
}

module.exports={addElectrovalve,deleteElectrovalve, getElectrovalve,updateElectrovalve}