const connection = require('../cores/database');
const {CustomError} = require ('../errors/CustomError')

const addElectrovalveInDb = (userId,pinPosition,name,isAutomatic) => {
    //par defaut isAutomatic=
    //let isAutomatic = true
    return new Promise ((resolve, reject) => {
        connection.query(
            "INSERT INTO Electrovalve (name, position, userId, isAutomatic) VALUES (?, ?, ?, ?)",
            [name, pinPosition, userId,isAutomatic],
            (error, results) => {
                if (error) {
                    reject(error);
                    console.log(error)
                } else resolve(results);
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
                    console.log(error)
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
                    console.log(error);
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        )
    })
}

const updateValveNameInDb = (userId, idElectrovalve, name) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "UPDATE Electrovalve SET name = ? WHERE userId = ? AND id = ?",
            [name, userId, idElectrovalve],
            (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log(`modification name:${name}, idValve: ${idElectrovalve}`)
                    resolve(results);
                }
            })
    })
}
const updateValveIsAutomaticInDb = (userId, idElectrovalve, isAutomatic) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "UPDATE Electrovalve SET isAutomatic = ? WHERE userId = ? AND id = ?",
            [isAutomatic, userId, idElectrovalve],
            (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log(`modification isAutomatic:${isAutomatic}, idValve: ${idElectrovalve}`)
                    resolve(results);
                }
            })
    })
}

module.exports = {updateValveNameInDb,updateValveIsAutomaticInDb,addElectrovalveInDb, deleteElectrovalveInDb, getElectrovalveInDb}