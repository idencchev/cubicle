const jwt = require('jsonwebtoken');
const { COOKIE_NAME, JWT_SECRET } = require('../config/config');

module.exports = () => {
    return (req, res, next) => {
        let token = req.cookies[COOKIE_NAME];
        if (token) {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    req.user = decoded;
                    res.locals.isAuthenticated = true;
                }
            });
        }
        next();
    }
}