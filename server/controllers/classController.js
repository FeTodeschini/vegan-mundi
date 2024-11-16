const connectToDb = require('../config/dbConfig');
const { CustomError } = require('../middlewares/errorHandler');

async function getFreeClasses (req, res, next) {

    let connection;

    try {
        connection = await connectToDb();
        const query = 'SELECT RCP.RECIPE_ID, RCP.TITLE, RCP.DESCRIPTION, RCP.PHOTO, RCP.VIDEO, RCP.PUBLISH_DATE, RCP.DISPLAY_ORDER ' +
          ' FROM ' + 
          ' CLASS CLS' +  
          '  INNER JOIN CLASS_RECIPE CLR ON' + 
          '    CLS.CLASS_ID = CLR.CLASS_ID ' + 
          '    AND CLS.CATEGORY_ID = 1' + 
          '  INNER JOIN RECIPE RCP ON  ' + 
          '    CLR.RECIPE_ID = RCP.RECIPE_ID' +
          '  ORDER BY DISPLAY_ORDER';
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

async function getClassesPerCategory (req, res, next) {

    let connection;

    try {
        const email = req.query.email || null
        const category = req.params.category

        let params;
        
        if (email)
            params = [ email, category ]
        else
            params = [category]

        connection = await connectToDb();
        let query = `SELECT DISTINCT CAT.TITLE AS CATEGORY_TITLE, CLS.CLASS_ID, CLS.CATEGORY_ID, CLS.TITLE, CLS.DESCRIPTION, CLS.PHOTO , ` +
                        ` ( SELECT GROUP_CONCAT(TITLE SEPARATOR '|') 
                            FROM 
                              RECIPE R 
                                INNER JOIN CLASS_RECIPE C ON 
                                  R.RECIPE_ID = C.RECIPE_ID 
                                  AND C.CLASS_ID = CLS.CLASS_ID
                                  AND (SELECT COUNT(TITLE) FROM RECIPE R INNER JOIN CLASS_RECIPE C ON R.RECIPE_ID = C.RECIPE_ID AND C.CLASS_ID = CLS.CLASS_ID ) > 1
                              ) CLASSES_LIST ` + 
                      ` FROM ` +
                        ` CLASS_CATEGORY CAT ` + 
                        ` INNER JOIN CLASS CLS ON ` +
                        `   CAT.CATEGORY_ID = CLS.CATEGORY_ID `

            if (email !== null) {
                query +=   `AND CLS.CLASS_ID NOT IN (
                                SELECT CLASS_ID FROM ORDER_CLASS OCL WHERE EMAIL = ?)`
            }
                    
            query += `   AND UPPER(CAT.CATEGORY_ID) = ? ` +
                        ` INNER JOIN CLASS_RECIPE CLR ON ` +
                        `   CLS.CLASS_ID = CLR.CLASS_ID ` +
                        ` INNER JOIN RECIPE RCP ON ` +
                        `   CLR.RECIPE_ID = RCP.RECIPE_ID `;

        // result needs to be destructured as mysql2/promise returns 2 items: the rows themselves plus metadata about the result
        const [result] = await connection.query(query, params);

        // In the old version of this API using mysql.createConnection (single connection), the whole data returned by the db was stored in result 
        // Now that mysql2/promises wth createPool is being used, it is necessary to add the "top level" of the db return to resul (categoryTitle and classes)
        const categoryTitle = result.length > 0 ? result[0].CATEGORY_TITLE : null; 

        // Construct the response object
        const resultObject = {
            categoryTitle,
            classes: result,
        };

        res.send(resultObject);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
    finally {
        if (connection) connection.release();
    }
};

async function getCategories (req, res, next) {

    let connection;

    try {
        connection = await connectToDb();
        const query = 'SELECT * FROM CLASS_CATEGORY WHERE CATEGORY_ID IN (2, 3, 4) ORDER BY DISPLAY_ORDER';
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


async function getClassesPerKeyword (req, res, next) {

    const email = req.query.email || null
    const keyword = `%${req.params.keyword}%`

    let connection;
    let params; 
    
    if (email)
        params = [ email, keyword ]
    else
        params = [keyword]

    try {
        connection = await connectToDb();
        let query = `SELECT DISTINCT CLS.CATEGORY_ID, CLS.CLASS_ID, CLS.TITLE, CLS.TITLE, CLS.DESCRIPTION, CLS.PHOTO, ` +
          ` ( SELECT GROUP_CONCAT(TITLE SEPARATOR '|') 
              FROM 
              RECIPE R 
                INNER JOIN CLASS_RECIPE C ON 
                  R.RECIPE_ID = C.RECIPE_ID 
                  AND C.CLASS_ID = CLS.CLASS_ID
                  AND (SELECT COUNT(TITLE) FROM RECIPE R INNER JOIN CLASS_RECIPE C ON R.RECIPE_ID = C.RECIPE_ID AND C.CLASS_ID = CLS.CLASS_ID ) > 1
              ) CLASSES_LIST ` + 
           ` FROM CLASS CLS ` +
            ` INNER JOIN CLASS_RECIPE CLR ON ` +
            `   CLS.CLASS_ID = CLR.CLASS_ID ` 

            if (email !== null) {
                query +=   ` AND CLS.CLASS_ID NOT IN (
                                SELECT CLASS_ID FROM ORDER_CLASS OCL WHERE EMAIL = ?) `
            }
            
            query += ` INNER JOIN RECIPE RCP ON ` +
            `   CLR.RECIPE_ID = RCP.RECIPE_ID ` +
            `   AND RCP.KEYWORD LIKE ?`;

        // result needs to be destructured as mysql2/promise returns 2 items: the rows themselves plus metadata about the result
        const [result] = await connection.query(query, params);
        res.send(result);
    } catch (err) {
        next(new CustomError(`Error while fetching classes based on keyword search: ${err.message}`, 500));
    }
    finally {
        if (connection) connection.release();
    }
};


async function updateClassDate(req, res, next) {

    let connection;

    try {
        const date = req.body.date || null
        const email = req.body.email || null
        const classId = req.body.classId || null

        const params = [ date, email, classId  ]

        connection = await connectToDb();
        let query = `UPDATE ORDER_CLASS SET CLASS_DATE = ? WHERE EMAIL = ? AND CLASS_ID = ? `

        await connection.query(query, params);

        res.send(resultObject);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
    finally {
        if (connection) connection.release();
    }
};


async function getUserClasses (req, res, next) {

    let connection;

    try {
        const email = req.query.email || null
   
        connection = await connectToDb();
        let query = `SELECT DISTINCT CLS.CATEGORY_ID, CAT.TITLE AS CATEGORY_TITLE, ` +
                ` OCL.DELIVERY_METHOD_ID, DME.TITLE , OCL.CLASS_DATE, ` +
                ` CLS.CLASS_ID,   CLS.TITLE, CLS.DESCRIPTION, CLS.PHOTO , ` +
                ` (SELECT CONCAT( ` +
                `        '[', ` +
                `        GROUP_CONCAT( ` +
                `            CONCAT('{"TITLE":"', R.TITLE, '","PHOTO":"', R.PHOTO, '"}') ` +
                `            SEPARATOR ',' ` +
                `        ), ` +
                `        ']') ` +
                `    FROM RECIPE R ` +
                `    INNER JOIN CLASS_RECIPE C ON R.RECIPE_ID = C.RECIPE_ID ` +
                `        AND C.CLASS_ID = CLS.CLASS_ID ` +
                `    WHERE C.CLASS_ID = CLS.CLASS_ID ` +
                ` ) AS CLASSES_LIST, ` + 
                ` REV.STARS , REV.REVIEW_TEXT ` +
                ` FROM CLASS_CATEGORY CAT ` +
                ` INNER JOIN CLASS CLS ON ` +
                `   CAT.CATEGORY_ID = CLS.CATEGORY_ID ` +
                `   AND CLS.CLASS_ID IN (SELECT CLASS_ID FROM ORDER_CLASS OCL WHERE EMAIL = ?) ` +
                ` INNER JOIN ORDER_CLASS OCL ON CLS.CLASS_ID = OCL.CLASS_ID ` +
                ` 	AND OCL.EMAIL = ? ` +
                ` INNER JOIN DELIVERY_METHOD DME ON OCL.DELIVERY_METHOD_ID = DME.ID ` + 
                ` LEFT JOIN REVIEW REV ON CLS.CLASS_ID = REV.CLASS_ID AND REV.EMAIL = ?`

        // result needs to be destructured as mysql2/promise returns 2 items: the rows themselves plus metadata about the result
        const [result] = await connection.query(query, [email, email, email]);
        // In the old version of this API using mysql.createConnection (single connection), the whole data returned by the db was stored in result 
        // Now that mysql2/promises wth createPool is being used, it is necessary to add the "top level" of the db return to result (categoryTitle and classes)
        res.send(result);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
    finally {
        if (connection) connection.release();
    }
    
};
module.exports = { getCategories, getClassesPerCategory, getFreeClasses, getClassesPerKeyword, getUserClasses, updateClassDate };