const { insertIrrigationData } = require('../models/AutoModel');

const timers = {};

const startManualIrrigation = async (userId, electrovalveId, duration) => {
  const dateStart = new Date();
  const start = await fetch("http://localhost:8090/startIrrigation", {
    method: "POST",
  }).then((res) => res.json());
  console.log(`Arrosage démarré pour l'utilisateur ${userId} et la Valve ${electrovalveId}: pour un temps de ${duration} minute(s)`, start);
  console.log('dateStart', dateStart);

  timers[`${userId}-${electrovalveId}`] = setTimeout(async () => {
    await stopManualIrrigation(userId, electrovalveId, dateStart);
  }, duration * 1000 * 60);

  console.log('timers', timers);

  return dateStart;
};

const stopManualIrrigation = async (userId, electrovalveId, dateStart) => {
  const dateEnd = new Date();
  const volume = 999;

  await insertIrrigationData(electrovalveId, dateStart, dateEnd, volume);

  const stop = await fetch("http://localhost:8090/stopIrrigation", {
    method: "POST",
  }).then((res) => res.json());

  const timerKey = `${userId}-${electrovalveId}`;
  console.log('timers[timerKey]', timers[timerKey])
  if (timers[timerKey]) {
    clearTimeout(timers[timerKey]);
    delete timers[timerKey];
  }
  console.log(`Arrosage arrêté pour l'utilisateur ${userId} et la Valve ${electrovalveId}:`, stop);
};

module.exports = { startManualIrrigation, stopManualIrrigation }