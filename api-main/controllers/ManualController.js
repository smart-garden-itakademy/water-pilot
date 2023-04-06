const { insertIrrigationData } = require('../models/AutoModel');

const timers = {};

const startManualIrrigation = async (userId, electrovalveId, duration) => {
  const dateStart = new Date();
  const start = await fetch("http://localhost:8090/startIrrigation", {
    method: "POST",
  }).then((res) => res.json());
  console.log(`Arrosage manuel démarré pour l'utilisateur ${userId} et la Valve ${electrovalveId}: pour un temps de ${duration} minute(s)`, start);
  console.log('dateStart', dateStart);

  const timerKey = `${userId}-${electrovalveId}`;
  timers[timerKey] = {
    timeout: setTimeout(async () => {
      await stopManualIrrigation(userId, electrovalveId);
      delete timers[timerKey];
    }, duration * 1000 * 60),
    dateStart: dateStart,
  };

  console.log('timers', timers);

  return dateStart;
};

const stopManualIrrigation = async (userId, electrovalveId, dateStart) => {
  const dateEnd = new Date();
  const volume = 999;

  const timerKey = `${userId}-${electrovalveId}`;
  const storedDateStart = timers[timerKey]?.dateStart;

  const dateToInsert = storedDateStart || dateStart;

  await insertIrrigationData(electrovalveId, dateToInsert, dateEnd, volume);

  const stop = await fetch("http://localhost:8090/stopIrrigation", {
    method: "POST",
  }).then((res) => res.json());
  console.log(`Arrosage manuel arrêté pour l'utilisateur ${userId} et la Valve ${electrovalveId}:`, stop);
};

module.exports = { startManualIrrigation, stopManualIrrigation, timers }