const {getValveSettingInDb, addValveSettingInDb, deleteValveSettingInDb, updateValveSettingInDb} = require ('../models/valveSettingModel');
const {isValveNotInDb,  giveValvePostion} = require ('../controllers/ElectrovalveController');
const {CustomError} = require ('../errors/CustomError')

const isSettingInDb = async ( idElectrovalve) => {
    const getSettings = await getValveSetting (idElectrovalve);
    return !!getSettings.find(e => e.idElectrovalve == idElectrovalve)

}
const getIdSetting = async (idElectrovalve) => {
    const getSetting = await getValveSetting (idElectrovalve);
    return getSetting[0].id
}
const getValveSetting = async (idValve) => {
    try{
        return getValveSettingInDb(idValve);
    }catch(e){
        throw new Error(e)
    }
}
const addValveSetting = async (rainThreshold, moistureThreshold, duration, idElectrovalve) => {

    try {
        const addSettingsInDb = await addValveSettingInDb(rainThreshold, moistureThreshold, duration, idElectrovalve);
        return {
            idSettings: addSettingsInDb.insertId,
            rainThreshold: rainThreshold,
            moistureThreshold: moistureThreshold,
            duration: duration,
            idElectrovalve: idElectrovalve,
        }
    } catch (err) {
        console.error(err);
        throw new CustomError("Impossible d'ajouter les settings de l'éléctrovalve.", 500);
    }
}
const deleteValveSetting = async (idElectrovalve,userId) => {
    try {
        const deleteInDb = await deleteValveSettingInDb(idElectrovalve);
        console.log()
        if (deleteInDb.affectedRows) {
            return `La configuration de l'éléctrovalve qui a pour ID: ${idElectrovalve} a été supprimée avec succès`
        }
    }catch (err) {
        console.error(err);
        throw new CustomError ("Impossible de supprimer la configuration de l'éléctrovalve.",500);
    }
}
const updateValveSetting = async (rainThreshold, moistureThreshold, duration,idElectrovalve) => {

        try {
            await updateValveSettingInDb(rainThreshold, moistureThreshold, duration,idElectrovalve);
            return ({
                msg:`Les settings de l'éléctrovalve ${idElectrovalve} sont mis à jour`
            })
        }catch (err) {
            console.error(err);
            throw new CustomError (`Impossible de modifier la configuration de l'éléctrovalve ${idElectrovalve}.`,500);
        }
}


module.exports={getIdSetting,isSettingInDb,getValveSetting,addValveSetting,deleteValveSetting, updateValveSetting}