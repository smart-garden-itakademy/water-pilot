const connection = require('../cores/database');

const addElectrovalveInDb = (userId,pinPosition,name) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "INSERT INTO Electrovalve (name, position, userId) VALUES (?, ?, ?)",
            [name, pinPosition, userId],
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
const deleteElectrovalveInDb = (idElectrovalve, userId) => {

    return new Promise ((resolve, reject) => {
        connection.query(
            "DELETE FROM Electrovalve WHERE id = ? AND userId = ?",
            [idElectrovalve, userId],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    results.msg = `L'éléctrovalve  qui a pour ID: ${idElectrovalve}  a été supprimée avec succès`;
                    resolve(results);
                }
            }
        )
    })
}
const getElectrovalveInDb = (userId) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "SELECT * FROM Electrovalve WHERE userId = ? ",
            [userId],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la récupération des éléctrovalves dans la base de données :", error);
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        )
    })
}
const updateElectrovalveInDb = (name,userId,idElectrovalve) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "UPDATE Electrovalve SET name = ? WHERE userId = ? AND id = ?",
            [name,userId,idElectrovalve],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la modification de l'éléctrovalve dans la base de données :", error);
                    reject(error);
                } else {
                    console.log(`modification name:${name}, idValve: ${idElectrovalve}`)
                    resolve(results);
                }
            })
    })
}

module.exports = {addElectrovalveInDb, deleteElectrovalveInDb, getElectrovalveInDb,updateElectrovalveInDb}