const { Router } = require('express');
const router = Router();
//Conectar a Base de Datos
/*const admin = require('firebase-admin');
var cuentaServicio = require('../../nodejs-a846c-firebase-adminsdk-ij0gw-dba4f09f3c.json');
admin.initializeApp({
    credential: admin.credential.cert(cuentaServicio),
    databaseURL: 'https://nodejs-a846c-default-rtdb.firebaseio.com/'
});

const db = admin.database();*/

const passport = require('passport');
//const { noEstaLogueado } = require('../rutas/auth');

const db = require('../keysfirebase');

//Listar Productos y será la raíz
/*router.get('/', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    db.ref('productos').orderByChild('estado').equalTo("Activo").once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('productos/listadoProductos', { productos: data });
        console.log('Datos desede la bd --> ', data);
    });
    
});*/

//Gestionar Productos
router.get('/gestionarProductos', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    db.ref('productos').orderByChild('estado').equalTo("Inactivo").once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('productos/gestionarProductos', { productos: data });
        console.log("Desde la base de datos --> ", data);
    });
    
});


router.get('/activarProducto/:id', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    const id = req.params.id;
    const estado = "Activo";
    db.ref('productos').child(id).child('estado').set(estado);
    res.redirect('/gestionarProductos');
    
});




//Agregar Productos
router.get('/agregarProductos', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    res.render('productos/agregarProductos');
});

router.post('/agregarProductos/', (req, res) => {
    const id = req.params.id;
    const estado = "Activo";
    const { nombre, descripcion, precio, imagen } = req.body;
    const nuevoProducto = {
        nombre,
        descripcion,
        precio,
        imagen,
        estado
    };
    db.ref('productos').push(nuevoProducto);
    req.flash('agregado', 'Insertado Correctamente');
    res.redirect('/');
});




//Editar Productos
router.get('/editarProductos/:id', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    db.ref('productos').child(req.params.id).once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('productos/editarProductos', { producto: data, id: req.params.id });
        console.log('Datos desede la bd --> ', data);
    });
});

router.post('/editarProductos/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio, imagen } = req.body;
    const nuevoProducto = {
        nombre,
        descripcion,
        precio,
        imagen
    };
    db.ref('productos').child(id).update(nuevoProducto);
    res.redirect('/');
});


//Eliminar producto - Cambiar estado
router.get('/eliminarProducto/:id', (req, res) => {
    const id = req.params.id;
    const estado = "Inactivo";
    db.ref('productos').child(id).child('estado').set(estado);
    res.redirect('/');
});

//Exportar
module.exports = router;