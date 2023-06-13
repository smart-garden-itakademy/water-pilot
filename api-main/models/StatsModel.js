const connection = require("../cores/database");

// Get the last 14 days of irrigation stats for each electrovalve
// Returns an object with the electrovalve name as key and an object with the date as key and the total volume as value
// Example: { "Electrovalve 1": { "01/01/2021": 10, "02/01/2021": 20 }, "Electrovalve 2": { "01/01/2021": 5, "02/01/2021": 15 } }
const getLast14DaysIrrigationStats = (userId) => {
    return new Promise((resolve, reject) => {

        connection.query(
            `SELECT 
              Electrovalve.name AS electrovalve_name,
              DATE(Irrigation.dateStart) AS irrigation_date,
              SUM(Irrigation.volume) AS total_volume
            FROM 
              Irrigation
              INNER JOIN Electrovalve ON Irrigation.idElectrovalve = Electrovalve.id
              INNER JOIN User ON Electrovalve.userId = User.id
            WHERE 
              User.id = ?
              AND Irrigation.dateStart >= DATE_SUB(NOW(), INTERVAL 14 DAY)
            GROUP BY 
              Electrovalve.name,
              DATE(Irrigation.dateStart)
            ORDER BY 
              Electrovalve.name,
              DATE(Irrigation.dateStart) DESC
            `,
            [userId],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la récupération des données d'irrigations : ", error);
                    reject(error);
                }

                // Create a new object to store the modified results
                const modifiedResults = {};

                // Loop through each result
                for (const result of results) {
                    const date = new Date(result.irrigation_date).toLocaleDateString('fr-FR', {day: '2-digit', month: '2-digit'});
                    const electrovalveName = result.electrovalve_name;
                    const totalVolume = result.total_volume;

                    // Create a new object for the electrovalve if it doesn't exist in the modified results
                    if (!modifiedResults[electrovalveName]) {
                        modifiedResults[electrovalveName] = {};
                    }
                    // Add the total volume for the date to the modified results
                    modifiedResults[electrovalveName][date] = totalVolume;
                }
                // Loop through each electrovalve in the modified results and add missing days with a volume of 0
                const daysToAdd = 14;
                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                for (const electrovalveName in modifiedResults) {
                    const electrovalveData = modifiedResults[electrovalveName];
                    let currentDate = new Date(today.getTime());
                    for (let i = 0; i < daysToAdd; i++) {
                        const day = currentDate.getDate().toString().padStart(2, "0");
                        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
                        const dateStr = `${day}/${month}`;
                        if (!electrovalveData[dateStr]) {
                            electrovalveData[dateStr] = 0;
                        }
                        currentDate.setDate(currentDate.getDate() - 1);
                    }
                }
                // Sort the modifiedResults object by date
                const sortedElectrovalves = Object.keys(modifiedResults)
                    .sort((a, b) => {
                        const aDates = Object.keys(modifiedResults[a]).map(dateStr => new Date(dateStr.split('/').reverse().join('-')));
                        const bDates = Object.keys(modifiedResults[b]).map(dateStr => new Date(dateStr.split('/').reverse().join('-')));
                        return Math.min(...aDates) - Math.min(...bDates);
                    });
                const sortedModifiedResults = {};
                for (const electrovalveName of sortedElectrovalves) {
                    const electrovalveData = modifiedResults[electrovalveName];
                    const sortedData = {};
                    Object.keys(electrovalveData)
                        .sort((a, b) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-')))
                        .forEach(date => {
                            sortedData[date] = electrovalveData[date];
                        });
                    sortedModifiedResults[electrovalveName] = sortedData;
                }
                resolve(sortedModifiedResults);
            }
        );
    });
};

// Get the monthly irrigation stats for each electrovalve
// Returns an object with the electrovalve name as key and an object with the date as key and the total volume as value
// Example: { "Electrovalve 1": { "01/01/2021": 10, "02/01/2021": 20 }, "Electrovalve 2": { "01/01/2021": 5, "02/01/2021": 15 } }
const getMonthlyIrrigationStats = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT
                 Electrovalve.name AS electrovalve_name,
                 DATE(Irrigation.dateStart) AS irrigation_date,
                 SUM(Irrigation.volume) AS total_volume
             FROM
                 Irrigation
                 INNER JOIN Electrovalve ON Irrigation.idElectrovalve = Electrovalve.id
                 INNER JOIN User ON Electrovalve.userId = User.id
             WHERE
                 User.id = ?
               AND YEAR(Irrigation.dateStart) = YEAR(CURRENT_DATE())
               AND MONTH(Irrigation.dateStart) = MONTH(CURRENT_DATE())
             GROUP BY
                 Electrovalve.name,
                 DATE(Irrigation.dateStart)
             ORDER BY
                 Electrovalve.name,
                 DATE(Irrigation.dateStart) DESC
            `,
            [userId],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la récupération des données d'irrigations : ", error);
                    reject(error);
                }

                // Create a new object to store the modified results
                const modifiedResults = {};

                // Get the number of days in the current month
                const now = new Date();
                const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

                // Loop through each result
                for (const result of results) {
                    const date = new Date(result.irrigation_date).toLocaleDateString('fr-FR', {day: '2-digit', month: '2-digit'});
                    const electrovalveName = result.electrovalve_name;
                    const totalVolume = result.total_volume;

                    // Create a new object for the electrovalve if it doesn't exist in the modified results
                    if (!modifiedResults[electrovalveName]) {
                        modifiedResults[electrovalveName] = {};
                    }

                    // Add the total volume for the date to the modified results
                    modifiedResults[electrovalveName][date] = totalVolume;
                }

                // Loop through each electrovalve in the modified results and add missing days with a volume of 0
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                for (const electrovalveName in modifiedResults) {
                    const electrovalveData = modifiedResults[electrovalveName];
                    for (let i = 1; i <= daysInMonth; i++) {
                        const day = i.toString().padStart(2, "0");
                        const month = (now.getMonth() + 1).toString().padStart(2, "0");
                        const dateStr = `${day}/${month}`;
                        if (!electrovalveData[dateStr]) {
                            electrovalveData[dateStr] = 0;
                        }
                    }
                }
                // Sort the modifiedResults object by date
                const sortedElectrovalves = Object.keys(modifiedResults)
                    .sort((a, b) => {
                        const aDates = Object.keys(modifiedResults[a]).map(dateStr => new Date(dateStr.split('/').reverse().join('-')));
                        const bDates = Object.keys(modifiedResults[b]).map(dateStr => new Date(dateStr.split('/').reverse().join('-')));
                        return Math.min(...aDates) - Math.min(...bDates);
                    });
                const sortedModifiedResults = {};
                for (const electrovalveName of sortedElectrovalves) {
                    const electrovalveData = modifiedResults[electrovalveName];
                    const sortedData = {};
                    Object.keys(electrovalveData)
                        .sort((a, b) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-')))
                        .forEach(date => {
                            sortedData[date] = electrovalveData[date];
                        });
                    sortedModifiedResults[electrovalveName] = sortedData;
                }
                resolve(sortedModifiedResults);
            }
        );
    });
}

// Get stats for each sensor
const getSensorsStats = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT Sensor.id, Sensor.name, Sensor.position, Sensor.value, Sensor.date, Type.name AS type_name, Type.unit\n" +
            "FROM Sensor\n" +
            "INNER JOIN Type ON Sensor.typeId = Type.id\n" +
            "WHERE Sensor.userId = ?",
            [userId], (error, results) => {
                if (error) {
                    console.error("Erreur lors de la récupération des données des capteurs : ", error);
                    reject(error);
                }
                resolve(results);
            })
    })
}

module.exports = {
    getLast14DaysIrrigationStats,
    getSensorsStats
}