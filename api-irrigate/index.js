const express = require ("express");
const router = require('./router/route');
const dotenv = require ('dotenv');

const app = express();

dotenv.config();

app.use(express.json());

app.use('/', router);

const port = process.env.SERVER_PORT;
app.listen(8090, () => {
    console.log(`Le serveur a démarré sur le port ${port}`)
})