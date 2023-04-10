const scheduleModel = require ('../models/ScheduleModel');


const checkings = async (userId, idElectrovalve) => {
    // check if electrovalve belong this user
    const valve = await giveValvePostion (userId, idElectrovalve);
    if (valve.exists){
        // check if settings belohgs this electrovalve
    }else return valve.errmsg

}

const getSchedules = (req.userId,idSettings) => {
    // check if
}