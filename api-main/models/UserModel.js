const connection = require('../cores/database');

const saveNewUser = (HashPwd, name, email) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO User (name, email, password) VALUES(?,?,?)",
            [name, email, HashPwd],
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
        );
    });
};

module.exports = {saveNewUser,getUsers}


