const valveSettingModel = require ('../models/valveSettingModel');

const getValveSetting = (userId) => {
    try{
        return valveSettingModel.getValveSettingInDb(userId);
    }catch(e){
        throw new Error("Unable to get electrovalve settings.Errormsg:"+e)
    }
}
const addValveSetting = async (rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve) => {
    //check if idElectrovalve exist and belongs this userId

    //check if a setting already exist on this valve

    //save settings
    try {
        const addValveSettingInDb = await valveSettingModel.addValveSettingInDb(rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve);
        return true;

    } catch (e) {
        throw new Error("Unable to add electrovalve settings.Errormsg:" + e);
        return false
    }
}
//const deleteValveSetting = async valveSettingModel.deleteValveSettingInDb(idElectrovalve,idValveSetting)



module.exports={getValveSetting,addValveSetting}