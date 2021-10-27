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
const { noEstaLogueado, estaLogueado } = require('../rutas/auth');

const db = require('../keysfirebase');

//Listar Productos y será la raíz

router.get('/ventas', estaLogueado, (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    db.ref('ventas').orderByChild('estado').equalTo("Activo").once('value', (snapshot) => {
        const data = snapshot.val();
        const ventasTotal = snapshot.numChildren();
        res.render('ventas/listadoVentas', {activeProductos : true, productos: data, ventasT: ventasTotal });
        console.log('Datos desede la bd --> ', data, ventasTotal);
    });
});





//Api JSON productos
router.get('/api/productos', estaLogueado, (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    db.ref('productos').orderByChild('estado').equalTo("Activo").once('value', (snapshot) => {
        const data = snapshot.val();
        res.json(data);
        console.log('Datos desede la bd --> ', data);
    });
});


//Gestionar Productos Inactivos
router.get('/gestionarProductos', estaLogueado, (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    db.ref('productos').orderByChild('estado').equalTo("Inactivo").once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('productos/gestionarProductos', { productos: data });
        console.log("Desde la base de datos --> ", data);
    });
    
});

router.get('/activarProducto/:id',  estaLogueado, (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    const id = req.params.id;
    const estado = "Activo";
    db.ref('productos').child(id).child('estado').set(estado);
    res.redirect('/productos');
});




//Agregar Ventas
router.get('/ventas/crear/:ventasT',  estaLogueado, (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    console.log(res);
    let ventasT = parseInt(req.params.ventasT)+1;
    res.render('ventas/agregarVentas',{activeProductos : true, ventasTo: ventasT});
});

router.post('/agregarVentas/',  estaLogueado, (req, res) => {
    const id = req.params.id;
    const estado = "Activo";
    const { factura, cliente, tipodoc, documento, direccion, telefono, fecha, producto, cantidad, total, vendedor } = req.body;
    const nuevaVenta = {
        factura,
        cliente,
        tipodoc,
        documento,
        direccion,
        telefono,
        fecha,
        producto,
        cantidad,
        total,
        vendedor,
        estado
    };
    db.ref('ventas').push(nuevaVenta);
    req.flash('agregado', 'Insertado Correctamente');
    res.redirect('/ventas');
});




//Editar Productos
router.get('/productos/editar/:id',  estaLogueado, (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    db.ref('productos').child(req.params.id).once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('productos/editarProductos', {activeProductos : true, producto: data, id: req.params.id });
        console.log('Datos desede la bd --> ', data);
    });
});

router.post('/editarProductos/:id',  estaLogueado, (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio, imagen } = req.body;
    const nuevoProducto = {
        nombre,
        descripcion,
        precio,
        imagen
    };
    db.ref('productos').child(id).update(nuevoProducto);
    req.flash('agregado', 'Editado Correctamente');
    res.redirect('/productos');
});


//Eliminar producto - Cambiar estado
router.get('/eliminarProducto/:id',  estaLogueado, (req, res) => {
    const id = req.params.id;
    const estado = "Inactivo";
    db.ref('productos').child(id).child('estado').set(estado);
    req.flash('agregado', 'Eliminado Correctamente');
    res.redirect('/productos');
});

//Exportar
module.exports = router;