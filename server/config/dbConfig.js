const mysql = require('mysql2/promise');
const config = require('../config');

const dbPool = mysql.createPool({
    host: config.dbHost,
    user: config.dbUserName,
    password: config.dbSecret,
    database: config.dbName,
});

async function connectToDb() {
    const connection = await dbPool.getConnection();
    return connection;
}

module.exports = connectToDb;