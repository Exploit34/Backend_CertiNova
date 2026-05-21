const routes = require('./src/route/routes');
const session = require('express-session');
const express = require('express');
const path = require('path');
require('dotenv').config()

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));

app.use('/api', routes);

app.listen(5000, () => {
    console.log('Servidor corriendo en http://localhost:5000/api');
});