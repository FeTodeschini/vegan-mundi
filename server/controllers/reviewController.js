const connectToDb = require('../config/dbConfig');
const { CustomError } = require('../middlewares/errorHandler');

async function addReview (req, res, next) {

    let connection;

    try {

        const { email, classId, stars, reviewText } = req.body
        const params = [email, classId, stars, reviewText]

        connection = await connectToDb();
        const query = 'INSERT INTO REVIEW (EMAIL, CLASS_ID, STARS, REVIEW_TEXT ) VALUES ( ?, ?, ?, ?) '
        await connection.query(query, params);
        res.status(201).json({message: `Review added successfully for class ${classId}`});
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
    finally {
        if (connection) connection.release();
    }
};

async function getReview (req, res, next) {

    let connection;

    try {
        const { classId, email } = req.body;
        const params = [ email, classId ]
        
        connection = await connectToDb();
        const query = `SELECT EMAIL, CLASS_ID, STARS, REVIEW_TEXT FROM REVIEW` +
             `   WHERE EMAIL = ? AND CLASS_ID = ? `

        // result needs to be destructured as mysql2/promise returns 2 items: the rows themselves plus metadata about the result
        const [result] = await connection.query(query, params);
        res.send(result);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
    finally {
        if (connection) connection.release();
    }
};

async function getAllReviews (req, res, next) {

    let connection;

    try {
        const { classId } = req.body;
        const params = [classId];

        connection = await connectToDb();
        const query = `SELECT EMAIL, CLASS_ID, STARS, REVIEW_TEXT FROM REVIEW WHERE CLASS_ID = ? `

        // result needs to be destructured as mysql2/promise returns 2 items: the rows themselves plus metadata about the result
        const [result] = await connection.query(query, params);
        res.send(result);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
    finally {
        if (connection) connection.release();
    }
};

module.exports = { addReview, getReview, getAllReviews };