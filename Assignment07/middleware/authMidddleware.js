const config = require('../config')
const jwt = require('jsonwebtoken')
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        error: 'Access denied'
    });
    try {
        const decoded = jwt.verify(token, config.secret);
        req.name = decoded.name;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;