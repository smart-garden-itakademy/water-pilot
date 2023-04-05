const connection = require("../cores/database");

const userId = 1;
const getIrrigationStats = () => {
    return new Promise((resolve, reject) => {

        connection.query(
            "SELECT Irrigation.dateStart, Irrigation.dateEnd, Irrigation.volume, Electrovalve.name AS electrovalve_name\n" +
            "FROM Irrigation\n" +
            "INNER JOIN Electrovalve ON Irrigation.idElectrovalve = Electrovalve.id\n" +
            "INNER JOIN User ON Electrovalve.idUser = User.id\n" +
            "WHERE User.id = ?;",
            [userId], (error, results) => {
                if (error) {
                    console.error("Erreur lors de la récupération des données d'irrigations : ", error);
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};

const getSensorsStats = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT Sensor.id, Sensor.name, Sensor.position, Sensor.value, Sensor.date, Type.name AS type_name, Type.unit\n" +
            "FROM Sensor\n" +
            "INNER JOIN Type ON Sensor.idType = Type.id\n" +
            "WHERE Sensor.idUser = ?",
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
    getIrrigationStats,
    getSensorsStats
}