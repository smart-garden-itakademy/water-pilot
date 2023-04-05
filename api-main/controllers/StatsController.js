const statsModel = require("../models/StatsModel");
const showIrrigationStats = () => {
    return statsModel.getIrrigationStats()
}

const showSensorsStats = () => {
    return statsModel.getSensorsStats()
}

module.exports={showIrrigationStats, showSensorsStats}