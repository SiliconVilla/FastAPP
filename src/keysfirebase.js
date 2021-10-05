//Conectar a Base de Datos
const admin = require('firebase-admin');
var cuentaServicio = require('../nodejs-a846c-firebase-adminsdk-ij0gw-dba4f09f3c.json');
admin.initializeApp({
    credential: admin.credential.cert(cuentaServicio),
    databaseURL: 'https://nodejs-a846c-default-rtdb.firebaseio.com/'
});

const db = admin.database();

module.exports = db;