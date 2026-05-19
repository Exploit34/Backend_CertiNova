const express = require('express');
const path = require('path');

const router = express.Router();

const {
    getAllUsers,
    crearSolicitud
} = require('../controllers/solicitudController');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
});


router.get('/AllUsers', getAllUsers);

router.post('/solicitud', crearSolicitud);

module.exports = router;