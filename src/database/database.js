//const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.PORT_DB
});

connection.connect((err) => {
    if(err) {
        console.info('Error database: ', err.message);
        return
    }

    console.info('Base de datos conectada 🚀');
});

module.exports = connection;