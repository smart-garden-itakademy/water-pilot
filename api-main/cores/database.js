const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.set('strictQuery',true);

const database = mongoose.connect(process.env.MONGO_CONNECTION,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = database;

