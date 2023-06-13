const connection = require('../cores/database');

const getSchedulesInDb = (idSettings) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "SELECT sc.* FROM Schedule sc WHERE sc.idSettings = ?",
            [idSettings],
            (error, results) => {
                if(error){
                    console.error("Erreur lors de la récupération des schedules dans la base de données :", error);
                    reject(error);
                } else resolve(results)
            }
        )
    })
}
const addScheduleInDb = (hourStart, hourEnd, days, idSettings,isActivated) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "INSERT INTO Schedule (hourStart, hourEnd, days, idSettings, isActivated)VALUES (?, ?, ?, ?, ?)",
            [hourStart, hourEnd, days, idSettings, isActivated],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de l'enregistrement du schedule dans la base de données :", error);
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        )
    })
}
const deleteScheduleInDb = (idSchedule) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "DELETE FROM Schedule WHERE id = ?",
            [idSchedule],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la suppression du schedule dans la base de données :", error);
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        )
    })
}
const putScheduleInDb = (hourStart, hourEnd, days, idSettings,isActivated,idSchedule) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "UPDATE Schedule SET hourStart = ?, hourEnd = ?, days = ?, isActivated = ?,idSettings = ?  WHERE id = ?",
            [hourStart, hourEnd, days, isActivated, idSettings, idSchedule],
            (error, results) => {
                if(error){
                    console.error(error)
                    reject(error)
                }else{
                    resolve(results)
                }
            }
            )
    })
}

module.exports = {putScheduleInDb,getSchedulesInDb, addScheduleInDb, deleteScheduleInDb}