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
const findUserInDb = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM User WHERE email = ? ",
            [email],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
                    reject(error);
                } else {
                    console.log("results", results);
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

module.exports = {saveNewUser,getUsers,findUserInDb, updateLocation}