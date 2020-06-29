// Created - 02.04.2020 - by Kajetan

const mysql = require('mysql')
const db_config = require('../config/db_config.js');

var pool = mysql.createPool({
    connectionLimit: 65,
    host: db_config.HOST,
    user: db_config.USER,
    password: db_config.PASSWORD,
    database: db_config.DB,
    multipleStatements: true
});

module.exports = pool
