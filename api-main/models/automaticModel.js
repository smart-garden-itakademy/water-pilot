const connection = require('../cores/database');

const testDbConnection = (req, res) => {
    connection.query('SELECT * FROM User', (error, results) => {
        if (error) {
            console.error('Erreur lors de la connexion à la base de données:', error);
            return res.status(500).json({ message: 'Erreur lors de la connexion à la base de données' });
        }

        res.status(200).json({ message: 'Connexion à la base de données réussie', data: results });
    });
};

module.exports = {
    testDbConnection,
};