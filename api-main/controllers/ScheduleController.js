const {getSchedulesInDb, addScheduleInDb, deleteScheduleInDb} = require ('../models/ScheduleModel');
const {giveValvePostion} = require ('../controllers/ElectrovalveController');
const {isSettingNotInDb} = require ('../controllers/ValveSettingController');

const checkings = async (userId, idElectrovalve) => {
    // check if electrovalve belong this user
    const valve = await giveValvePostion (userId, idElectrovalve);
    const isSettingExist= await isSettingNotInDb(userId, idElectrovalve)
    (valve.exists && isSettingExist)?true:false;
}

const getSchedules = async (idSettings) => {
    //checking if idSetting exist and belong this user
    try{
        return await getSchedulesInDb(idSettings);
    }catch(e){
        throw new Error("Unable to get schedules.Errormsg:"+e)
    }
}

const addSchedule = async (hourStart, hourEnd, days, idSettings) => {
    //check if idSetting exist and belong this user
    
    //-------
    try {
        const scheduleAdded =  await addScheduleInDb (hourStart, hourEnd, days, idSettings);
        return scheduleAdded ;
    } catch (e) {
        throw new Error("Unable to add schedule.Errormsg:" + e);
    }
}
const deleteSchedule = async (idSchedule) => {
    try {
        const scheduledeleted =  await deleteScheduleInDb (idSchedule) ;
        return scheduledeleted ;
    } catch (e) {
        throw new Error("Unable to delete schedule.Errormsg:" + e);
    }
}


module.exports={getSchedules,addSchedule,deleteSchedule}