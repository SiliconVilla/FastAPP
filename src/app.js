const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

//Configuraciones iniciales
app.set('port', 7000);
app.set('views', path.join(__dirname, 'vistas'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//routes files and css
app.use(express.static('.'));
app.set(express.static(path.join(__dirname, 'src/publico')));

//Conectores
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));

//Rutas
app.use(require('./rutas/productos'));
app.use(require('./rutas/login'));
app.use(require('./rutas/usuarios'));

//Exportar el módulo
module.exports = app;