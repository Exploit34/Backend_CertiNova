const db = require('../database/database');

const SolicitudSertificado = (
    nombre,
    correo,
    documento,
    certificado
) => {

    return new Promise((resolve, reject) => {

        db.query(
            'SELECT 1 FROM solicitudes WHERE email = ? LIMIT 1',
            [correo],
            (err, results) => {

                if (err) {
                    return reject(err);
                }

                if (results.length > 0) {
                    return reject({
                        status: 400,
                        message: 'El correo ya existe'
                    });
                }

                db.query(
                    `INSERT INTO solicitudes
                    (nombre, email, documento, certificado)
                    VALUES (?, ?, ?, ?)`,
                    [nombre, correo, documento, certificado],

                    (err, results) => {

                        if (err) {
                            return reject(err);
                        }

                        resolve(results);
                    }
                );
            }
        );
    });
};

module.exports = SolicitudSertificado;