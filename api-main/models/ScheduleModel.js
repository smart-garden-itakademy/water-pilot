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
const addScheduleInDb = (hourStart, hourEnd, days, idSettings) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "INSERT INTO Schedule (hourStart, hourEnd, days, idSettings)VALUES (?, ?, ?, ?)",
            [hourStart, hourEnd, days, idSettings],
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

module.exports = {getSchedulesInDb, addScheduleInDb, deleteScheduleInDb}