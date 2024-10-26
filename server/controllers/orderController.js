const connectToDb = require('../config/dbConfig');
const { CustomError } = require('../middlewares/errorHandler');

async function addOrderClasses (connection, classes) {
  try {
    const query = `INSERT INTO ORDER_CLASS (ORDER_NUMBER, EMAIL, CLASS_ID, DELIVERY_METHOD_ID, NUM_STUDENTS, PRICE, DISCOUNT_PERCENTAGE, 
        CLASS_DATE, PURCHASE_DATE) VALUES ?`;

    const classesWithPurchaseDate = classes.map(c => [
      c.ORDER_NUMBER,
      c.EMAIL,
      c.CLASS_ID,
      c.DELIVERY_METHOD_ID,
      c.NUM_STUDENTS,
      c.PRICE,
      c.DISCOUNT_PERCENTAGE,
      c.CLASS_DATE,
      new Date()
    ]);

    await connection.query(query, [classesWithPurchaseDate]);
    return;
  } catch (err) {
    throw new Error(`Error registering order's classes: ${err.message}`);
  }
}

async function addOrder (req, res, next) {

    const { orderNumber, email, classes } = req.body;
    let connection;

    try {

        if (!Array.isArray(classes) || classes.length === 0) {
          return res.status(400).json({ error: 'Invalid input for /classes/persist: expecting a non-empty array.' });
        }

        connection = await connectToDb();
        
        // add order
        const query = `INSERT INTO \`ORDER\` 
            (ORDER_NUMBER, EMAIL, PAYMENT_METHOD_ID, ORDER_DATE) 
            VALUES (?, ?, \'CRC\', NOW())`;

        await connection.query(query, [orderNumber, email]);

        // add order classes
        await addOrderClasses(connection, classes)

        res.status(201).json({
            message: 'Order added successfully',
            orderNumber: orderNumber,
            email: email
        });
    } catch (err) {
        next(new CustomError(`We apologize. Your order could not be completed. ${err.message}`, 500));
    }
    finally {
        if (connection) connection.release();
    }
};



module.exports = addOrder;