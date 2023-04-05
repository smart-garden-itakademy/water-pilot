const connection = require('../cores/database');

const getSchedules = (idSettings) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM Schedule WHERE idSettings = ?',
      [idSettings],
      (error, results) => {
        if (error) {
          console.error("Erreur lors de la récupération des schedules :", error);
          reject(error);
        }
        const schedulesWithDaysAsArray = results.map(schedule => ({
          ...schedule,
          days: schedule.days.split(',').map(Number),
        }));
        resolve(schedulesWithDaysAsArray);
      }
    );
  });
};

const getAllValvesWithSettings = async () => {
  return new Promise(async (resolve, reject) => {
    connection.query(
      `SELECT 
        Electrovalve.*, 
        ValveSettings.*, 
        User.id as userId,
        User.latitude as latitude,
        User.longitude as longitude
      FROM 
        Electrovalve 
        INNER JOIN ValveSettings ON Electrovalve.id = ValveSettings.idElectrovalve 
        INNER JOIN User ON Electrovalve.userId = User.id`,
      async (error, results) => {
        if (error) {
          console.error(
            "Erreur lors de la récupération des électrovannes et de leurs paramètres :",
            error
          );
          reject(error);
        } else {
          const valvesWithSettingsPromises = results.map(async (valve) => {
            const schedules = await getSchedules(valve.id);
            return {
              ...valve,
              schedules,
            };
          });
          const valvesWithSettings = await Promise.all(valvesWithSettingsPromises);
          resolve(valvesWithSettings);
        }
      }
    );
  });
};

module.exports = {
  getAllValvesWithSettings,
};
