// Created - 02.04.2020 - by Kajetan

const mysql = require('mysql')
const db_config = require('../config/db_config.js');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: db_config.HOST,
    user: db_config.USER,
    password: db_config.PASSWORD,
    database: db_config.DB,
    multipleStatements: true
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    console.log("MySQL connection pool initialized")
    return
})

module.exports = pool

/* const mysql = require('mysql');
const db_config = require('../config/db_config.js');

// Create a connection to the database
const connection = mysql.createConnection({
    host: db_config.HOST,
    user: db_config.USER,
    password: db_config.PASSWORD,
    database: db_config.DB
});

// open the connection --> TODO: Be careful to close connection somehow
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to MySQL database")
});
 */