const connectToDb = require('../config/dbConfig');
const { CustomError } = require('../middlewares/errorHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function createAccount (req, res, next) {

    const {firstName, lastName, email, password} = req.body;
  
    // Hash the password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let connection;

    try {
        connection = await connectToDb();
        const query = `INSERT INTO ACCOUNT VALUES(
          '${email}', 
          '${firstName}', 
          '${lastName}', 
          '${hashedPassword}')`;
        // result needs to be destructured as mysql2/promise returns 2 items: the rows themselves plus metadata about the result
        await connection.query(query);
        res.status(201).send("Account created successfully");
    } catch (err) {
        if(err.code === 'ER_DUP_ENTRY') {
            return next(new CustomError(`There is already an account registered with the e-mail '${email}'`, 400));
        }else {
            return next(new CustomError("There was an error while creating your account", 500));
        }
    }
    finally {
        if (connection) connection.release();
    }
};

async function signIn (req, res, next) {
    const {email, password} = req.body;
    let connection;
    let result

    try {
        connection = await connectToDb();
        [result] = await connection.query(`SELECT * FROM ACCOUNT WHERE EMAIL = '${email}'`)

        if (result.length === 0) {
            return next(new CustomError("Invalid credentials", 400));
        }

        bcrypt.compare(password, result[0].PASSWORD, (err, isValidPassword) => {
            if (err) {
                return next(new CustomError(`It seems like our servers are napping after a cooking class. There was an error while signin in`, 500));
            }
            else {
                if (isValidPassword) {
                    const userInfo = {
                        firstName: result[0].FIRST_NAME,
                        lastName: result[0].LAST_NAME,
                        email: result[0].EMAIL
                    };
                    
                    const token = jwt.sign(
                        userInfo,
                        config.jwtSecretKey,
                        { expiresIn: '1h' }
                    );

                    res.status(200).json({
                        message: "Signin successfull",
                        token: token,
                        userInfo: userInfo
                    });

                }
                else {
                    return next(new CustomError("Invalid credentials", 400));
                }
            }
        });
    } catch (err) {
        console.error("Error during sign-in:", err);
        return next(new CustomError("Error while retrieving user info", 500));
    } finally {
        // Ensure the connection is released back to the pool
        if (connection) connection.release();
    }
}

module.exports = { createAccount, signIn };
