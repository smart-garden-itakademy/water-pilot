const { getAllValvesWithSettings } = require('../models/AutomaticModel');

const getWeatherData = async (latitude, longitude) => {
  const API_KEY = process.env.KEY;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
  return response.json();
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

const getSensorsData = async () => {
  const res = await fetch("http://localhost:8090/sensors");
  return res.json();
};

const isSoilMoistureLevelValid = (soilMoistureLevel, minSoilMoistureLevel) => {
  return soilMoistureLevel <= minSoilMoistureLevel;
};

const isRainBelowThresholdAndNotExpectedNow = (rainThreshold24h, isRainingNow, minThreshold, weatherDataError) => {
  if (weatherDataError) {
    return false;
  }
  return rainThreshold24h <= minThreshold && !isRainingNow;
};

const startIrrigation = async (userId, electrovalveId) => {
  const start = await fetch("http://localhost:8090/startIrrigation", {
    method: "POST",
  }).then((res) => res.json());
  console.log(`Arrosage démarré pour l'utilisateur ${userId} et la Valve ${electrovalveId}:`, start);
};

const stopIrrigation = async (userId, electrovalveId) => {
  const stop = await fetch("http://localhost:8090/stopIrrigation", {
    method: "POST",
  }).then((res) => res.json());
  console.log(`Arrosage arrêté pour l'utilisateur ${userId} et la Valve ${electrovalveId}:`, stop);
};

const processWeatherData = (weatherData) => {
  if (!weatherData) {
    console.log("Echec de la récupération des données");
    return { rainNow: false, rain24h: 0, weatherDataError: true };
  }

  const rainNow = weatherData.list[0].weather.some((weather) => weather.main === 'Rain');
  const rain24h = weatherData.list
    .slice(0, 8)
    .reduce((accumulator, forecast) => accumulator + (forecast.rain?.['3h'] || 0), 0);

  console.log("Pluie actuelle :", rainNow);
  console.log("Pluie dans les 24 prochaines heures :", rain24h);

  return { rainNow, rain24h, weatherDataError: false };
}

const checkIrrigationStatus = async (valveWithSettings) => {
  for (const schedule of valveWithSettings.schedules) {
    if (isWateringScheduleValid(schedule.hourStart, schedule.hourEnd, schedule.days)) {
      console.log("Le programme d'arrosage est valide");

      try {
        const sensorsData = await getSensorsData();
        const soilMoistureLevel = sensorsData.soil_moisture;
        console.log("Niveau d'humidité du sol :", soilMoistureLevel);

        const weatherData = await getWeatherData(valveWithSettings.latitude, valveWithSettings.longitude);
        const { rainNow, rain24h, weatherDataError } = processWeatherData(weatherData);

        if (
          isSoilMoistureLevelValid(soilMoistureLevel, valveWithSettings.moistureThreshold) &&
          isRainBelowThresholdAndNotExpectedNow(rain24h, rainNow, valveWithSettings.rainThreshold, weatherDataError)
        ) {
          console.log("Les conditions d'arrosage sont remplies");
          startIrrigation(valveWithSettings.userId, valveWithSettings.idElectrovalve);
          setTimeout(
            () => stopIrrigation(valveWithSettings.userId, valveWithSettings.idElectrovalve),
            valveWithSettings.duration * 60 * 1000,
          );

        } else {
          console.log("Les conditions d'arrosage ne sont pas remplies");
        }
      } catch (error) {
        console.error("Error checking irrigation status:", error);
      }
    } else {
      console.log("Le programme d'arrosage n'est pas valide");
    }
  }
}

const main = async () => {
  try {
    const valvesWithSettings = await getAllValvesWithSettings();
    console.log("Électrovannes et paramètres récupérés :", valvesWithSettings);

    for (const valveWithSettings of valvesWithSettings) {
      await checkIrrigationStatus(valveWithSettings);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

main();

setInterval(async () => {
  console.log("Vérification de l'état de l'arrosage toutes les heures");
  await main();
}, 60 * 60 * 1000);