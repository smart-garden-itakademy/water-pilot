const connection = require('../cores/database');

const saveNewUser = (hashPwd, name, email, city, longitude, latitude) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO User (name, email, password, latitude, longitude, city) VALUES(?,?,?,?,?,?)",
            [name, email, hashPwd, latitude, longitude, city],
            (error, results) => {
            if (error) {
                console.error('Erreur lors de la connexion à la base de données:', error);
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

const getUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM User" ,
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la récupération des schedules :", error);
                    reject(error);
                }
                resolve(results);
            }
        )
    })
}
const isUserMailExist = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM User WHERE email = ? ",
            [email],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
                    reject(error);
                } else {
                    console.log("results", results.length);
                    resolve(results);
                }
            });
    })
}
const updateLocation = (userId, longitude, latitude) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "UPDATE User SET longitude = ?, latitude = ? WHERE id = ?",
            [longitude, latitude, userId],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la mise à jour des données de l'utilisateur :", error);
                    reject(error);
                } else {
                    console.log("Les données de l'utilisateur ont été mises à jour avec succès");
                    resolve(results);
                }
            }
        )
    })
}
const addElectrovalveInDb = (userId,pinPosition,name) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "INSERT INTO Electrovalve (name, position, userId) VALUES (?, ?, ?)",
            [name, pinPosition, userId],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de l'enregistrement de l'éléctrovalve dans la base de données :", error);
                    reject(error);
                } else {
                    console.log("L'éléctrovalve a été mise à jour avec succès");
                    resolve(results);
                }
            }
        )
    })
}
const deleteElectrovalveInDb = (pinPosition, userId) => {
    return new Promise ((resolve, reject) => {
        connection.query(
            "DELETE FROM Electrovalve WHERE position = ? AND userId = ?",
            [pinPosition, userId],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la suppression de l'éléctrovalve dans la base de données :", error);
                    reject(error);
                } else {
                    console.log(`L'éléctrovalve branchée sur le pin ${pinPosition} du user ${userId} a été supprimée avec succès`);
                    results.msg = `L'éléctrovalve branchée sur le pin ${pinPosition} a été supprimée avec succès`;
                    resolve(results);
                }
            }
        )
    })
}
module.exports = {saveNewUser,getUsers,isUserMailExist, updateLocation,addElectrovalveInDb,deleteElectrovalveInDb}