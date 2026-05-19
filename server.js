const express = require('express');
const path = require('path');

const app = express();

/* CONFIGURACIONES */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* RUTAS */
const routes = require('./src/route/routes');
app.use('/', routes);

/* SERVIDOR */
app.listen(5000, () => {
    console.log('Servidor corriendo en http://localhost:5000');
});