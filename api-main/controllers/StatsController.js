const statsModel = require("../models/StatsModel");
const showIrrigationStats = () => {
    return statsModel.getLast14DaysIrrigationStats()
}

const showSensorsStats = () => {
    return statsModel.getSensorsStats()
}

module.exports={showIrrigationStats, showSensorsStats}