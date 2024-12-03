const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Remove "Bearer" from the authorization header, as it comes in the form 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ error: 'Authentication token missing' });
    }

    jwt.verify(token, config.jwtSecretKey, (err, userInfo) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.userInfo = userInfo;
        //  passes the control to the next middleware (or route handler)
        next();
    });
};

module.exports = authenticateToken;