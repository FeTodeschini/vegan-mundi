const connectToDb = require('../config/dbConfig');
const { CustomError } = require('../middlewares/errorHandler');

async function getPrices (req, res, next) {

    let connection;

    try {
        connection = await connectToDb();
        const query = 'SELECT * FROM PRICE';
        // result needs to be destructured as mysql2/promise returns 2 items: the rows themselves plus metadata about the result
        const [result] = await connection.query(query);
        res.send(result);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
    finally {
        if (connection) connection.release();
    }
};

module.exports = getPrices;