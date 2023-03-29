const {
  getPosition,
  getAllValvesWithSettings
} = require('../models/automaticModel');

const getCurrentPosition = async () => {
  try {
    const position = await getPosition();
    return position;
  } catch (error) {
    console.error('Erreur lors de la récupération de la position:', error);
    return null;
  }
};

const getUserPosition = async () => {
  const position = await getCurrentPosition();
  return {
    latitude: position.latitude,
    longitude: position.longitude
  };
};

const isWateringScheduleValid = (startHour, stopHour, days) => {
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();
  // console.log('days', days);

  return (
    (startHour <= stopHour &&
      currentHour >= startHour &&
      currentHour < stopHour &&
      days.includes(currentDay)) ||
    (startHour > stopHour &&
      (currentHour >= startHour || currentHour < stopHour) &&
      days.includes(currentDay))
  );
};

const getSensors = (callback) => {
  fetch("http://localhost:8090/sensors")
    .then((res) => res.json())
    .then((data) => {
      sensors = data;
      callback();
    });
};

const isSoilMoistureLevelValid = (soilMoistureLevel, minSoilMoistureLevel) => {
  return soilMoistureLevel <= minSoilMoistureLevel;
};

const isRainNotExpected = (rain24h, rainNow, threshold) => {
  return rain24h <= threshold && !rainNow;
};

const startIrrigation = async () => {
  const start = await fetch("http://localhost:8090/startIrrigation", {
    method: "POST",
  }).then((res) => res.json());
  console.log(start);
};

const stopIrrigation = async () => {
  const start = await fetch("http://localhost:8090/stopIrrigation", {
    method: "POST",
  }).then((res) => res.json());
  console.log(start);
};

function checkIrrigationStatus(valveWithSettings) {
  valveWithSettings.schedules.forEach((schedule) => {
    // console.log(schedule)
    if (isWateringScheduleValid(schedule.hourStart, schedule.hourEnd, schedule.days)) {
      // console.log(schedule)
      console.log("Le programme d'arrosage est valide");

      getSensors(() => {
        const soilMoistureLevel = sensors.soil_moisture;
        console.log("Niveau d'humidité du sol :", soilMoistureLevel);
        console.log(valveWithSettings.moistureThreshold)

        const rain24h = 30; // Remplacer par les données de l'API
        const rainNow = false; // Remplacer par les données de l'API
        console.log("Données de pluie (24h, actuellement) :", rain24h, rainNow);
        console.log(valveWithSettings.rainThreshold)

        if (
          isSoilMoistureLevelValid(
            soilMoistureLevel,
            valveWithSettings.moistureThreshold
          ) &&
          isRainNotExpected(rain24h, rainNow, valveWithSettings.rainThreshold)
        ) {
          console.log("Les conditions d'arrosage sont remplies");
          startIrrigation();
          setTimeout(
            stopIrrigation,
            valveWithSettings.duration * 60 * 1000,
          );
        } else {
          console.log("Les conditions d'arrosage ne sont pas remplies");
        }
      });
    } else {
      console.log("Le programme d'arrosage n'est pas valide");
    }
  });
}

async function main() {
  try {
    const position = await getUserPosition();
    console.log("Position récupérée :", position);

    const valvesWithSettings = await getAllValvesWithSettings(); // Récupère toutes les électrovannes et leurs paramètres
    console.log("Électrovannes et paramètres récupérés :", valvesWithSettings);

    for (const valveWithSettings of valvesWithSettings) {
      checkIrrigationStatus(valveWithSettings);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la position :", error);
  }
}

main();

setInterval(() => {
  console.log("Vérification de l'état de l'arrosage toutes les heures");
  main();
}, 60 * 60 * 1000);