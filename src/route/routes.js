const express = require('express');
const path = require('path');

const router = express.Router();
const {
    getAllUsers,
    crearSolicitud,
} = require('../controllers/solicitudController');
const procesarPagos = require('../controllers/procesarPago');
const login = require('../controllers/login');
const resgister = require('../controllers/register');

const adminMiddleware = require(
    '../middleware/adminMiddleware'
);

const userMiddleware = require('../middleware/userMiddleware');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/admin', adminMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
});

router.get('/user', userMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/success.html'));
});

router.get('/users', getAllUsers);

router.post('/solicitud', crearSolicitud);

router.get('/pago-certificado', procesarPagos);

router.post('/login', login);

router.post('/register', resgister);

module.exports = router;