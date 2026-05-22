const userMiddleware = (req, res, next) => {

    if (!req.session.user) {
        return res.status(401).send(
            'Debes iniciar sesión'
        );
    }

    if (req.session.user.role !== 'user') {
        return res.status(403).send(
            'Acceso denegado'
        );
    }

    next();
};

module.exports = userMiddleware;