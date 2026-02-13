const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Obtener el token del encabezado
    const token = req.header('x-auth-token');

    // Si no hay token, bloqueamos el acceso
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso denegado' });
    }

    // Verificar si el token es real
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next(); 
    } catch (err) {
        res.status(401).json({ msg: 'Token no es válido' });
    }
};