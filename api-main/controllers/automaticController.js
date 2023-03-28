// Il faut recuperer la position via le raspberry pi -> DB
// Il faut recuperer les userSettings en database 
// Il faut recuperer les donnees meteos en API 

const getCurrentPosition = () => {
  return {
    latitude: 45.7808503213175,
    longitude: 4.736120007422938,
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

const userSettings = {
  rainThreshold: 80,
  minimumSoilMoistureLevel: 50,
  wateringSchedule: [
    {
      startHour: 6,
      stopHour: 10,
      days: [1, 2, 3, 4, 5],
    },
    {
      startHour: 20,
      stopHour: 23,
      days: [1, 2, 3, 4, 5],
    },
  ],
  wateringDuration: 1,
};

const isWateringScheduleValid = (startHour, stopHour, days) => {
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();

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
      console.log("sensors", sensors);
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

const checkIrrigationStatus = () => {
  for (let i = 0; i < userSettings.wateringSchedule.length; i++) {
    const schedule = userSettings.wateringSchedule[i];
    if (
      isWateringScheduleValid(
        schedule.startHour,
        schedule.stopHour,
        schedule.days
      )
    ) {
      console.log("Le programme d'arrosage est valide");
      getSensors(() => {
        const soilMoistureLevel = sensors.soil_moisture;
        console.log("Niveau d'humidité du sol :", soilMoistureLevel);
        const rain24h = 30; // Remplacer par les données de l'API
        const rainNow = false; // Remplacer par les données de l'API
        console.log("Données de pluie (24h, actuellement) :", rain24h, rainNow);

        if (
          isSoilMoistureLevelValid(
            soilMoistureLevel,
            userSettings.minimumSoilMoistureLevel
          ) &&
          isRainNotExpected(rain24h, rainNow, userSettings.rainThreshold)
        ) {
          console.log("Les conditions d'arrosage sont remplies");
          startIrrigation();
          setTimeout(stopIrrigation, userSettings.wateringDuration * 60 * 1000);
        } else {
          console.log("Les conditions d'arrosage ne sont pas remplies");
        }
      });
    } else {
      console.log("Le programme d'arrosage n'est pas valide");
    }
  }
};

async function main() {
  try {
    const position = await getPosition();
    console.log("Position récupérée :", position);

    checkIrrigationStatus();

  } catch (error) {
    console.error("Erreur lors de la récupération de la position :", error);
  }
}

main();

// Pour vérifier l'état de l'arrosage toutes les heures
setInterval(() => {
  console.log("Vérification de l'état de l'arrosage toutes les heures");
  main();
}, 60 * 60 * 1000);