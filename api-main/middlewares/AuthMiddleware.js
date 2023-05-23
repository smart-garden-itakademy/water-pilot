const jwt = require('jsonwebtoken');


function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}
// middleware qui protège les routes qui nécessite une authentification
const authenticate = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        res.status(511).json({ message: 'Token non fourni' });
        return;
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        res.status(511).json({ message: 'Token invalide' });
        return;
    }
    req.userId = decoded.id;
    next();
};

module.exports = {authenticate, verifyToken};