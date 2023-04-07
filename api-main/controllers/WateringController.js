const { insertIrrigationData } = require('../models/WateringModel');

const timers = {};

const startIrrigation = async (userId, electrovalveId, duration, isAutomatic = false) => {
  const timerKey = `${userId}-${electrovalveId}`;

  if (timers[timerKey]) {
    console.log(`Il y a déjà un arrosage en cours pour l'utilisateur ${userId} et la Valve ${electrovalveId}.`);
    return;
  }

  const dateStart = new Date();
  const response = await fetch("http://localhost:8090/startIrrigation", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}: ${response.statusText}`);
  }

  const start = await response.json();
  console.log(
    `${isAutomatic ? "Arrosage automatique" : "Arrosage manuel"} démarré pour l'utilisateur ${userId} et la Valve ${electrovalveId}: pour un temps de ${duration} minute(s)`,
    start
  );

  timers[timerKey] = {
    timeout: setTimeout(async () => {
      await stopIrrigation(userId, electrovalveId, isAutomatic);
      delete timers[timerKey];
    }, duration * 1000 * 60),
    dateStart: dateStart,
    isAutomatic: isAutomatic,
  };

  console.log('timers', timers);

  return dateStart;
};


const stopIrrigation = async (userId, electrovalveId, isAutomatic = false) => {
  const dateEnd = new Date();
  const volume = isAutomatic ? 111 : 222;

  const timerKey = `${userId}-${electrovalveId}`;
  const storedDateStart = timers[timerKey]?.dateStart;

  if (!storedDateStart) {
    console.log(`Aucune irrigation en cours pour l'utilisateur ${userId} et la Valve ${electrovalveId}.`);
    return;
  }

  delete timers[timerKey];

  await insertIrrigationData(electrovalveId, storedDateStart, dateEnd, volume);

  const response = await fetch("http://localhost:8090/stopIrrigation", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}: ${response.statusText}`);
  }

  const stop = await response.json();
  console.log(
    `${isAutomatic ? "Arrosage automatique" : "Arrosage manuel"} arrêté pour l'utilisateur ${userId} et la Valve ${electrovalveId}:`,
    stop,
  );
};

module.exports = { startIrrigation, stopIrrigation, timers };
