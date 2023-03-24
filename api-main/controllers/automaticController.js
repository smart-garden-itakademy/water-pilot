const sensors = fetch('http://localhost:8090/sensors');

console.log('sensors', sensors)

//si localisation,on récupère les prévisions météo
const isRainExpected = (rain, threshold) => {
    return rain <= threshold;
    }
    
    const isSoilMoistureLevelValid = (soilMoistureLevel, minSoilMoistureLevel) => {
    return soilMoistureLevel <= minSoilMoistureLevel;
    }
    
    const isLastWateringTooRecent = (lastWateringTimestamp, minHoursSinceLastWatering) => {
    const hoursSinceLastWatering = (Date.now() - lastWateringTimestamp) / 1000 / 60 / 60;
    return hoursSinceLastWatering >= minHoursSinceLastWatering;
    }
    
    const isWateringScheduleValid = (startHour, stopHour) => {
    const currentHour = new Date().getHours();
    return (startHour <= stopHour && currentHour >= startHour && currentHour < stopHour) ||
           (startHour > stopHour && (currentHour >= startHour || currentHour < stopHour));
    }
    
    const updateStateVariables = (userSettings, externData) => {
    const isRainExpectedResult = isRainExpected(externData.weatherData.rain, userSettings.rainThreshold);
    const isSoilMoistureLevelValidResult = isSoilMoistureLevelValid(externData.soilMoistureLevel, userSettings.minimumSoilMoistureLevel);
    const isLastWateringTooRecentResult = isLastWateringTooRecent(externData.lastWateringTimestamp, userSettings.minimumHoursSinceLastWatering);
    const isWateringScheduleValidResult = isWateringScheduleValid(userSettings.wateringSchedule.startHour, userSettings.wateringSchedule.stopHour);
    
    return isRainExpectedResult && isSoilMoistureLevelValidResult && !isLastWateringTooRecentResult && isWateringScheduleValidResult;
    }
    
    const isWateringEnabled = updateStateVariables(userSettings, externData);
    
    console.log('Is watering enabled:', isWateringEnabled);
    
    module.exports = {
      updateStateVariables,
      isWateringEnabled,
      userSettings,
      externData
    }