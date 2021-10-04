const { Router } = require('express');
const router = Router();
//Conectar a Base de Datos

//Listar Productos y será la raíz
router.get('/', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    res.render('productos/listadoProductos');
});

//Gestionar Productos
router.get('/gestionarProductos', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    /*db.ref('productos').orderByChild('estado').equalTo("Inactivo").once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('productos/gestionarProductos', { productos: data });
        console.log("Desde la base de datos --> ", data);
    });*/

    res.render('productos/gestionarProductos');
    
});


//Agregar Productos
router.get('/agregarProductos', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    res.render('productos/agregarProductos');
});


//Editar Productos
router.get('/editarProductos', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    res.render('productos/editarProductos');
});

//Exportar
module.exports = router;