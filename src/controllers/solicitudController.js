const path = require('path');
const db = require('../database/database');
const Solicitud =
    require('../repositories/solicitudRepository');

const getAllUsers = (req, res) => {

    db.query('SELECT * FROM solicitudes', (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                error: 'Error en la consulta'
            });
        }

        res.json(results);
    });
};

const crearSolicitud = async (req, res) => {

    const {
        nombre,
        correo,
        documento,
        certificado
    } = req.body;

    try {

        await Solicitud (
            nombre,
            correo,
            documento,
            certificado
        );
        
        res.sendFile (
            path.join(__dirname, '../views/success.html')
        );

    } catch(error){
        if(error.status === 400){
            return res.status(400).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: 'Error interno'
        });
    }
};

module.exports = {
    getAllUsers,
    crearSolicitud
};