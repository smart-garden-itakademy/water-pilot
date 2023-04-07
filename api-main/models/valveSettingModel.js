const connection = require('../cores/database');

const getValveSettingInDb = (userId) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "SELECT vs.* FROM ValveSettings vs INNER JOIN Electrovalve ev ON ev.id = vs.idElectrovalve INNER JOIN User u ON u.id = ev.userId WHERE u.id = ?",
            [userId],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la récupération des paramètres dans la base de données :", error);
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
            "INSERT INTO ValveSettings (rainThreshold, moistureThreshold, duration, isAutomatic, idElectrovalve)VALUES (?, ?, ?, ?, ?)",
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
const deleteValveSettingInDb = (idElectrovalve,idValveSetting) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "DELETE FROM ValveSettings WHERE id = ? AND idElectrovalve = ?",
            [idValveSetting,idElectrovalve],
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
const updateValveSettingInDb = (rainThreshold, moistureThreshold, duration, isAutomatic, idValveSetting) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "UPDATE ValveSettings SET rainThreshold = ?, moistureThreshold = ?, duration = ?, isAutomatic = ? WHERE id = ?",
            [rainThreshold, moistureThreshold, duration, isAutomatic, idValveSetting],
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