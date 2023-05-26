const connection = require('../cores/database');

const getValveSettingInDb = (idValve) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "SELECT * FROM ValveSettings WHERE idElectrovalve =?",
            [idValve],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        )
    })
}
const addValveSettingInDb = (rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "INSERT INTO ValveSettings (rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve) VALUES (?, ?, ?, ?, ?)",
            [rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de l'enregistrement des settings dans la base de données :", error);
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        )
    })
}
const deleteValveSettingInDb = (idElectrovalve) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "DELETE FROM ValveSettings WHERE idElectrovalve = ? ",
            [idElectrovalve],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la suppression des settings dans la base de données :", error);
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        )
    })
}
const updateValveSettingInDb = (rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "UPDATE ValveSettings SET rainThreshold = ?, moistureThreshold = ?, duration = ?, isAutomatic = ? WHERE idElectrovalve = ?",
            [rainThreshold, moistureThreshold, duration, isAutomatic,idElectrovalve],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la modification des settings dans la base de données :", error);
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        )
    })
}

module.exports = {getValveSettingInDb,addValveSettingInDb,deleteValveSettingInDb, updateValveSettingInDb}