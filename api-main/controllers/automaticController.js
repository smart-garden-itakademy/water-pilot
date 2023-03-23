// Données utilisateurs
const userSettings = {
    rainThreshold: 20,
    minimumSoilMoistureLevel: 40,
    minimumHoursSinceLastWatering: 24,
    wateringSchedule: {
      startHour: 15,
      stopHour: 20
    }
};

// Variables d'états
let isWateringEnabled = false;
let isRainExpected = false;
let isSoilMoistureLevelValid = false;
let isLastWateringTooRecent = false;
let isWateringScheduleValid = false;

const updateStateVariables = (userSettings) => {
  
  const currentHour = new Date().getHours();
  
  console.log('currentHour', currentHour);
  console.log('startHour', userSettings.wateringSchedule.startHour);
  console.log('stopHour', userSettings.wateringSchedule.stopHour);

  if (userSettings.wateringSchedule.startHour <= userSettings.wateringSchedule.stopHour) {
    // Cas où l'heure de début et l'heure de fin sont le même jour
    if (currentHour >= userSettings.wateringSchedule.startHour && currentHour < userSettings.wateringSchedule.stopHour) {
      isWateringScheduleValid = true;
    } else {
      isWateringScheduleValid = false;
    }
  } else {
    // Cas où l'heure de début et l'heure de fin s'étendent sur deux jours différents
    if (currentHour >= userSettings.wateringSchedule.startHour || currentHour < userSettings.wateringSchedule.stopHour) {
      isWateringScheduleValid = true;
    } else {
      isWateringScheduleValid = false;
    }
  }

  if (!isWateringScheduleValid) {
    return "l'arrosage ne peut pas être activé car l'heure d'arrosage est invalide";
  } else {
    return "l'heure d'arrosage est valide";
  }
}

module.exports = {  
  updateStateVariables, 
  userSettings 
}
