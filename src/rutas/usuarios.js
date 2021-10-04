const { Router } = require('express');
const router = Router();

//Lista Usuarios
router.get('/usuarios/maestroUsuarios', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    res.render('usuarios/maestroUsuarios');
});

//Exportar
module.exports = router;