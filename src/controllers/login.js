const loginRepository = require('../repositories/loginRepository');

const login = async (req, res) => {

    const { 
        email, 
        password
    } = req.body;

    try {
        const usuario = await loginRepository(email, password);

        req.session.user = {
            email: usuario.email,
            role: usuario.role
        };
        
        if (usuario.role === 'admin') {
            return res.redirect('/api/admin');
        } else if(usuario.role === 'user') {
            return res.redirect('/api/user');
        }
        
    } catch (error) {

        console.log(error);

        if (error.status === 401) {
            return res.status(401).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: 'Error interno'
        });
    }
};

module.exports = login;