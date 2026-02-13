const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // 1. Obtener el token del encabezado
    const token = req.header('x-auth-token');

    // 2. Si no hay token, bloqueamos el acceso
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso denegado' });
    }

    // 3. Verificar si el token es real
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next(); // ¡Adelante!
    } catch (err) {
        res.status(401).json({ msg: 'Token no es válido' });
    }
};