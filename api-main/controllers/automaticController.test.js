
//-------------------------------------------------------
// on vérifie qu'on a la localisation


//-------------------------------------------------------
//On récupère les UsersSettings via BDD

// TEST
// Données utilisateurs
const userSettings = {
  rainThreshold: 80,
  minimumSoilMoistureLevel: 50,
  wateringSchedule: [
    {
      startHour: 6,
      stopHour: 9,
      days: [
        1,2,3,4,5
      ]
    },
    {
      startHour: 15,
      stopHour: 20,
      days: [
        1,2,3,4,5
      ]
    }
  ],
  wateringDuration:60
};
//-------------------------------------------------------
//on lance l'algo isWateringScheduleValid

const isWateringScheduleValid = (startHour, stopHour) => {
  const currentHour = new Date().getHours();
  console.log(currentHour);
  console.log(startHour);
  console.log(stopHour);
  return (startHour <= stopHour && currentHour >= startHour && currentHour < stopHour) ||
      (startHour > stopHour && (currentHour >= startHour || currentHour < stopHour));
}
//console.log(isWateringScheduleValid(userSettings.wateringSchedule[0].startHour, userSettings.wateringSchedule[0].stopHour));

for(let i=0; i < userSettings.wateringSchedule.length; i++){
  console.log(isWateringScheduleValid(userSettings.wateringSchedule[i].startHour, userSettings.wateringSchedule[i].stopHour));

}


//-------------------------------------------------------
//On récupère les données des capteurs
const getSencors = async () => {
  const sensors = await fetch('http://localhost:8090/sensors').then(res => res.json());
  console.log('sensors', sensors)
}
getSencors();

// TEST
// Données du terrain
const externData = {
  weatherData: { rain: 30 },
  soilMoistureLevel: 42,
}


//-------------------------------------------------------

//On lance l'arrosage
const startIrrigation = async () => {
  const start = await fetch('http://localhost:8090/startIrrigation', { method: 'POST'} ).then(res => res.json());
  console.log(start)
}
startIrrigation();

//-------------------------------------------------------
//On arrête l'arrosage




//-------------------------------------------------------


// Variables d'états
let isWateringEnabled = false;
let isRainExpected = false;
let isSoilMoistureLevelValid = false;
let isLastWateringTooRecent = false;
//let isWateringScheduleValid = false;

const updateStateRainExpected = () => {
  
}

const updateStateMoisureLevel = () => {
  
}

const updateStateLastWatering = () => {
  
}

const updateStateWateringSchedule = () => {
  
}

const updateStateVariables = (userSettings, externData) => {

  // const isRainExpected = updateStateRainExpected(externData.weatherData.rain, userSettings.rainThreshold);
  // console.log('isSoilMoistureLevelValid', isSoilMoistureLevelValid)

  console.log('externData.weatherData.rain', externData.weatherData.rain)
  console.log('userSettings.rainThreshold', userSettings.rainThreshold)

  if (externData.weatherData.rain <= userSettings.rainThreshold) {
    isRainExpected = true;
  } else {
    isRainExpected = false;
  }

  // TEST
  if (!isRainExpected) {
    console.log ("l'arrosage ne peut pas être activé car il va surement pleuvoir dans les 12heures");
  } else {
    console.log ("la probabilité de pluit est faible l'arrosage est valide");
  }

  // const isSoilMoistureLevelValid = updateStateMoisureLevel(externData.soilMoistureLevel, userSettings.minimumSoilMoistureLevel);
  // console.log('isSoilMoistureLevelValid', isSoilMoistureLevelValid)

  console.log('externData.soilMoistureLevel', externData.soilMoistureLevel)
  console.log('userSettings.minimumSoilMoistureLevel', userSettings.minimumSoilMoistureLevel)

  if (externData.soilMoistureLevel <= userSettings.minimumSoilMoistureLevel) {
    isSoilMoistureLevelValid = true;
  } else {
    isSoilMoistureLevelValid = false;
  }

  // TEST
  if (!isSoilMoistureLevelValid) {
    console.log ("l'arrosage ne peut pas être activé car le sol est trop humide");
  } else {
    console.log ("le sol est sec l'arrosage est valide");
  }

  const hoursSinceLastWatering = (Date.now() - externData.lastWateringTimestamp) / 1000 / 60 / 60;

  console.log('hoursSinceLastWatering', hoursSinceLastWatering);
  console.log('userSettings.minimumHoursSinceLastWatering', userSettings.minimumHoursSinceLastWatering)
  console.log('externData.lastWateringTimestamp', externData.lastWateringTimestamp)

  if (hoursSinceLastWatering < userSettings.minimumHoursSinceLastWatering) {
    isLastWateringTooRecent = true;
  } else {
    isLastWateringTooRecent = false;
  }

  // TEST
  if (!isLastWateringTooRecent) {
    console.log ("l'arrosage ne peut pas être activé car le dernier arrosage est trop recent");
  } else {
    console.log ("le dernier arrosage date l'arrosage est valide");
  }

/*  const currentHour = new Date().getHours();

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
  }*/

  // TEST
  if (!isWateringScheduleValid) {
    console.log ("l'arrosage ne peut pas être activé car l'heure d'arrosage est invalide");
  } else {
    console.log ("l'heure d'arrosage est valide");
  }

  console.log(isRainExpected, isSoilMoistureLevelValid, isLastWateringTooRecent, isWateringScheduleValid)

  if (isRainExpected && isSoilMoistureLevelValid && isLastWateringTooRecent && isWateringScheduleValid) {
    isWateringEnabled = true;
  } else {
    isWateringEnabled = false;
  }
}

module.exports = {  
  updateStateVariables, 
  userSettings,
  externData
}

