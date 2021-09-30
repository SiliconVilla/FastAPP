const { Router } = require('express');
const router = Router();

//Listar Productos y será la raíz
router.get('/', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    res.render('productos/listadoProductos');
});

//Exportar
module.exports = router;