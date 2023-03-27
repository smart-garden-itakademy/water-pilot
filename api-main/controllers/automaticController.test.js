
//______Check__Si__Localisation____________________________________________________________
// if (localisation) -> on continu tant que pas de localisation l'alogrithme se lance pas

const getCurrentPosition = () => {
  return {
    latitude: 45.7808503213175,
    longitude: 4.736120007422938
  };
};

const getPosition = () => {
  return new Promise((resolve) => {
    const position = getCurrentPosition();
    resolve({
      latitude: position.latitude,
      longitude: position.longitude,
    });
  });
};

async function main() {
  try {
    const position = await getPosition();
    console.log("Position récupérée:", position);

    // Lancez votre algorithme ici

  } catch (error) {
    console.error("Erreur lors de la récupération de la position:", error);
  }
}

main();


//______Get__UserSettings__via__DB_________________________________________________________
// On récupère les UsersSettings via la BDD ->
// Bien récupérer la bonne sortie car les userSettings dépendent d'une sortie en particulier

// TEST (données utilisateurs en dur)
const userSettings = {
  rainThreshold: 80,
  minimumSoilMoistureLevel: 50,
  wateringSchedule: [
    {
      startHour: 6,
      stopHour: 9,
      days: [
        1, 2, 3, 4, 5
      ]
    },
    {
      startHour: 11,
      stopHour: 20,
      days: [
        1, 2, 3, 4, 5, 6, 7
      ]
    }
  ],
  wateringDuration: 60
};

//_______Vérifier__Le__Watering__Schedule_______________________________________________________
// On lance l'algo isWateringScheduleValid pour verifier qu'on soit sur une plage horaire valide
// On boucle sur le tableau des plages horaires tant qu'il y à une plage horaire
// Si la plage horaire est valide (true) on lance les autres verifications
// On verifie la plage horaire avec un setInterval ? Pour lancer la boucle toute les heures

const isWateringScheduleValid = (startHour, stopHour, days) => {
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();

  // CONSOLE LOG
  console.log('currentHour', currentHour);
  console.log('currentDay', currentDay);

  return (startHour <= stopHour && currentHour >= startHour && currentHour < stopHour && days.includes(currentDay)) ||
  (startHour > stopHour && ((currentHour >= startHour || currentHour < stopHour) && days.includes(currentDay)));
};

for (let i = 0; i < userSettings.wateringSchedule.length; i++) {
  const schedule = userSettings.wateringSchedule[i];
  console.log(`Watering schedule ${i + 1}:`);
  console.log(`- Valid hours: ${schedule.startHour}-${schedule.stopHour}`);
  console.log(`- Valid days: ${schedule.days.join(', ')}`);
  console.log(`- Is valid: ${isWateringScheduleValid(schedule.startHour, schedule.stopHour, schedule.days)}`);
}

//_______On__Récupère__Les__Données__Des__Capteurs________________________________________________
// On récupère les données des capteurs via l'api-irrigate pour avoir les données du terrain 

let sensors;

const getSensors = (callback) => {
  fetch('http://localhost:8090/sensors')
    .then(res => res.json())
    .then(data => {
      sensors = data;
      console.log('sensors', sensors);
      callback();
    });
};

//_______On__Récupère__Les__Données__Météos________________________________________________________
// On récupère les données météo via l'api open weather pour savoir si il pleut et si il va pleuvoir 
// Réfléchir jusqu'à quelle portée on regarde pour le seuil de precipitation (24h)

const getWeatherData = (callback) => {
  
};

// On regarde si les données du capteur sont plus ou moins élevé que les userSettings 
const isSoilMoistureLevelValid = (soilMoistureLevel, minSoilMoistureLevel) => {
  return soilMoistureLevel <= minSoilMoistureLevel;
};

// On regarde si les données météos sont aptes à provoquer l'arrosage ou non en fonction des previsions 
// de pluie sur une période et de si il pleut ou non à l'instant
const isRainNotExpected = (rain24h, rainNow, threshold) => {
  return (rain24h <= threshold) && !rainNow;
};

// TEST (données du terrain)
const initializeExternData = () => {
  const externData = {
    weatherData: { 
      rain24h: 30,
      rainNow: false
    },
    soilMoistureLevel: sensors.soil_moisture,
  };
  console.log('externData', externData);
  console.log('isSoilMoistureLevelValid', isSoilMoistureLevelValid(externData.soilMoistureLevel, userSettings.minimumSoilMoistureLevel));
  console.log('isRainNotExpected', isRainNotExpected(externData.weatherData.rain24h, externData.weatherData.rainNow, userSettings.rainThreshold));
};

getSensors(initializeExternData);

//_______Ft__Lancer__L'arrosage_____________________________________________________________
// On lance l'arrosage si la fonction isWateringEnabled = true
const startIrrigation = async () => {
  const start = await fetch('http://localhost:8090/startIrrigation', { method: 'POST'} ).then(res => res.json());
  console.log(start)
}
// startIrrigation();


//_______Ft__couper__L'arrosage_____________________________________________________________
// On arrête l'arrosage wateringDuration(en minute) apres que startIrrigation ai commencée 

const stopIrrigation = async () => {
  const start = await fetch('http://localhost:8090/stopIrrigation', { method: 'POST'} ).then(res => res.json());
  console.log(start)
}

// stopIrrigation();




// Variables d'états
let isWateringEnabled = false;
// let isRainExpected = false;
// let isSoilMoistureLevelValid = false;
let isLastWateringTooRecent = false;
// let isWateringScheduleValid = false;

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
  //externData
}

