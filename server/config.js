module.exports = {
    dbHost: process.env.DB_ENDPOINT?.trim(),
    dbName: process.env.DB_NAME?.trim(),
    dbPort: process.env.DB_PORT?.trim(),
    dbUserName: process.env.DB_USER?.trim(),
    dbSecret: process.env.DB_SECRET?.trim(),
}