const bcrypt = require('bcrypt');
const registerRepository = require('../repositories/registerRepository');

const register = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            company,
            password,
            confirmPassword,
        } = req.body;

        if (!fullName || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos.',
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Las contraseñas no coinciden.',
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña debe tener al menos 8 caracteres.',
            });
        }

        if (phone.length < 10) {
            return res.status(400).json({
                success: false,
                message: 'El número de teléfono debe tener al menos 10 caracteres.',
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await registerRepository(
            fullName,
            email,
            phone,
            company ?? null,
            hashedPassword
        );

        return res.redirect('/api/login');

    } catch (error) {
        console.error('Error en register:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
        });
    }
};

module.exports = register ;