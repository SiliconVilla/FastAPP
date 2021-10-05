const { Router } = require('express');
const router = Router();
const db = require('../keysfirebase');

//Lista Usuarios
/*router.get('/maestroUsuarios', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    res.render('usuarios/maestroUsuarios');
});*/

//Lista Usuarios
router.get('/maestroUsuarios', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    db.ref('usuarios').once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        res.render('usuarios/maestroUsuarios', { usuarios: data });

    });
    
});


//Agregar Usuarios
router.get('/agregarUsuarios', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    res.render('usuarios/agregarUsuarios');
});

router.post('/agregarUsuarios/', (req, res) => {
    const id = req.params.id;
    const estado = "Activo";
    const { nombre, rol } = req.body;
    const nuevoUsuario = {
        nombre,
        rol,
        estado
    };
    db.ref('usuarios').push(nuevoUsuario);
    res.redirect('/maestroUsuarios');
});


//Exportar
module.exports = router;