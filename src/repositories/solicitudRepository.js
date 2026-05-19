const db = require('../database/database');

const SolicitudSertificado = (
    nombre,
    correo,
    documento,
    certificado
) => {

    return new Promise((resolve, reject) => {

        db.query(
            'SELECT * FROM solicitudes WHERE correo = ?',
            [correo],
            (err, results) => {

                if (err) {
                    return reject(err);
                }

                // Si existe el correo
                if (results.length > 0) {
                    return reject({
                        status: 400,
                        message: 'El correo ya existe'
                    });
                }

                db.query(
                    `INSERT INTO solicitudes
                    (nombre, correo, documento, certificado)
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