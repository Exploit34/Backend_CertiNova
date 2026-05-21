const express = require('express');
const router = express.Router();

const procesarPagos = async (req, res) => {

    try {

        const referencia = 'CERTI-' + Date.now();

        const url =
        `https://checkout.wompi.co/p/?public-key=pub_test_Etq2Qu8CfeHh8CM0giSfjCPNj9sNguWZ&currency=COP&amount-in-cents=5000000&reference=${referencia}`;

        res.json({
            url
        });

    } catch(error){

        res.status(500).json({
            error: 'Error creando sesión'
        });
    }

};

module.exports = procesarPagos;