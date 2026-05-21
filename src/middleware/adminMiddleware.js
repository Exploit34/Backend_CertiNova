const adminMiddleware = (req, res, next) => {

    // if (!req.session.user) {
    //     return res.redirect('/api/login');
    // }

    if (!req.session.user) {
        return res.status(401).send(
            'Debes iniciar sesión'
        );
    }

    if (req.session.user.role !== 'admin') {
        return res.status(403).send(
            'Acceso denegado'
        );
    }

    next();
};

module.exports = adminMiddleware;