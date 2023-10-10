const jwt = require('jsonwebtoken');
const { SECRET_SESSION } = process.env;

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
    //Obtengo el header "Bearer {token}"
    const headerToken = req.headers['authorization'];
    if (!headerToken) {
        return res.status(401).json({ error: 'Fallo al autenticarse' });
    }
    //solo obtengo el token para poder verificarlo
    const token = headerToken.split(" ")[1];
    jwt.verify(token, SECRET_SESSION, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ error: 'Token expirado o incorrecto' });
        }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
    });
};

// Middleware de autorización
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.userRole !== role) {
            return res.status(403).json({ error: 'Usuario no autorizado' });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRole
};
