const valveSettingModel = require ('../models/valveSettingModel');
const {isValveNotInDb, giveValvePostion} = require ('../controllers/ElectrovalveController');

const isSettingNotInDb = async (userId, idElectrovalve) => {
    const getSettings = await getValveSetting (userId);
    if(getSettings.find(e => e.idElectrovalve == idElectrovalve)){
        return false
    }else return true
}
const getValveSetting = (userId) => {
    try{
        return valveSettingModel.getValveSettingInDb(userId);
    }catch(e){
        throw new Error("Unable to get electrovalve settings.Errormsg:"+e)
    }
}
const addValveSetting = async (rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve, userId) => {
    //check if idElectrovalve exist and belongs this userId
    console.log(await giveValvePostion(userId, idElectrovalve));
    //const valveNotInDb = await isValveNotInDb(userId, pinPosition)
    //check if electrovalve exists
    if (await giveValvePostion(userId, idElectrovalve)){
        //save only if a setting doesn't exist on this valve
        if(await isSettingNotInDb(userId, idElectrovalve)){
            try {
                const addValveSettingInDb = await valveSettingModel.addValveSettingInDb(rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve);
                return true;
            } catch (e) {
                throw new Error("Unable to add electrovalve settings.Errormsg:" + e);
                return false
            }
        }else {
            throw new Error("A setting already exist on this electrovalve.");
            return false
        }
    }else{
        throw new Error("this electrovalve is unknown.");
        return false
    }
}
const deleteValveSetting = async (idElectrovalve,idValveSetting,userId) => {
    //check if idElectrovalve exist and belongs this userId

    try {
        const deleteValveSettingInDb = await valveSettingModel.deleteValveSettingInDb(idElectrovalve,idValveSetting);
        return true
    }catch (e) {
        throw new Error ("Unable to delete electrovalve settings.Errormsg:" + e);
        return false
    }
}


module.exports={getValveSetting,addValveSetting,deleteValveSetting}