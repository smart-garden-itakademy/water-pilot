const statsModel = require("../models/StatsModel");
const getIrrigationStats = (userId) => {
    return statsModel.getLast14DaysIrrigationStats(userId)
}

const getSensorsStats = () => {
    return statsModel.getSensorsStats()
}

module.exports={getIrrigationStats, getSensorsStats}