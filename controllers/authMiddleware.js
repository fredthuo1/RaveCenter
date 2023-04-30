const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { user: true });
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        if (err instanceof jwt.JsonWebTokenError) {
            // if the error is related to the JWT token itself
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            // if the error is unrelated to the JWT token (e.g. a network error)
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = { verifyToken };
