const mysql = require('mysql2')

const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.DB_USER,
    password : process.env.PASS,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT
})

if (connection) {
    console.log('Connection à la base de donnée établie')
}

module.exports = connection