module.exports = {
    dbHost: process.env.DB_ENDPOINT,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    dbUserName: process.env.DB_USER,
    dbSecret: process.env.DB_SECRET,

    awsRegion: process.env.AWS_REGION,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_KEY
}