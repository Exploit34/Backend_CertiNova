const bcrypt = require('bcrypt');
const db = require('../database/database');

const loginRepository = (
    email,
    password
) => {

    return new Promise((resolve, reject) => {

        db.query(
            `SELECT email, password, role
             FROM users
             WHERE email = ?
             LIMIT 1`,
            [email],

            async (err, results) => {

                if (err) {
                    return reject(err);
                }

                if (results.length === 0) {
                    return reject({
                        status: 401,
                        message: 'Correo o contraseña incorrectos'
                    });
                }

                const usuario = results[0];

                const match = await bcrypt.compare(
                    password,
                    usuario.password
                );

                if (!match) {
                    return reject({
                        status: 401,
                        message: 'Correo o contraseña incorrectos'
                    });
                }

                resolve(usuario);
            }
        );
    });
};

module.exports = loginRepository;