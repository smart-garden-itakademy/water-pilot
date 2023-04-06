const { insertIrrigationData } = require('../models/WateringModel');

const timers = {};

const startIrrigation = async (userId, electrovalveId, duration, isAutomatic = false) => {
  const dateStart = new Date();
  const start = await fetch("http://localhost:8090/startIrrigation", {
    method: "POST",
  }).then((res) => res.json());
  console.log(
    `${isAutomatic ? "Arrosage automatique" : "Arrosage manuel"} démarré pour l'utilisateur ${userId} et la Valve ${electrovalveId}: pour un temps de ${duration} minute(s)`,
    start
  );

  const timerKey = `${userId}-${electrovalveId}`;
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
  const volume = isAutomatic ? 777 : 999;

  const timerKey = `${userId}-${electrovalveId}`;
  const storedDateStart = timers[timerKey]?.dateStart;

  if (storedDateStart) {
    await insertIrrigationData(electrovalveId, storedDateStart, dateEnd, volume);
  }

  const stop = await fetch("http://localhost:8090/stopIrrigation", {
    method: "POST",
  }).then((res) => res.json());
  console.log(
    `${isAutomatic ? "Arrosage automatique" : "Arrosage manuel"} arrêté pour l'utilisateur ${userId} et la Valve ${electrovalveId}:`,
    stop
  );
};

module.exports = { startIrrigation, stopIrrigation, timers };
