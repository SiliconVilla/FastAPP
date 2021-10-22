const { Router } = require('express');
const router = Router();

const db = require('../keysfirebase');
const estados = [
    {'nombre' : 'En proceso'},
    {'nombre' : 'Cancelado'},
    {'nombre' : 'Entregado'}
];

function getUsuarios() {
    return db.ref('usuarios').orderByChild("rol").equalTo("vendedor").once('value').then( snapshot => {
        return snapshot.val();
    });
}
function getProductos() {
    return db.ref('productos').orderByChild('estado').once('value').then( snapshot => {
        return snapshot.val();
    });
}

//Listar ventas y será la raíz

router.get('/ventas', (req, res) => {
    db.ref('ventas').orderByChild('estado').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('ventas/listado', {activeVentas : true, ventas: data});
    });
});

//Agregar Ventas
router.get('/ventas/crear', (req, res) => {
    Promise.all([getUsuarios(),getProductos()]).then(function(snapshots) {
        const usuarios = snapshots[0];
        const productos = snapshots[1];
        res.render('ventas/agregarVentas',{activeVentas : true, estados : estados, usuarios : usuarios});
    });
});

router.post('/agregarVentas/', (req, res) => {
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
    res.redirect('/productos');
});

//Editar Productos
router.get('/ventas/editar/:id', (req, res) => {
    /* db.ref('productos').child(req.params.id).once('value', (snapshot) => {
        const data = snapshot.val(); */
        res.render('productos/editarProductos', {activeProductos : true, producto: [], id: req.params.id });
    /*     console.log('Datos desede la bd --> ', data);
    }); */
});

router.post('/editarVentas/:id', (req, res) => {
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
router.get('/eliminarVenta/:id', (req, res) => {
    const id = req.params.id;
    const estado = "Inactivo";
    db.ref('productos').child(id).child('estado').set(estado);
    req.flash('agregado', 'Eliminado Correctamente');
    res.redirect('/productos');
});

//Exportar
module.exports = router;