const { Router } = require('express');
const router = Router();
const db = require('../keysfirebase');

//Lista Usuarios
router.get('/usuarios', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    db.ref('usuarios').once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        res.render('usuarios/maestroUsuarios', {activeUsuarios: true, usuarios: data });

    });
});


//Agregar Usuarios
router.get('/usuarios/crear', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    res.render('usuarios/agregarUsuarios',{activeUsuarios: true,});
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
    res.redirect('/usuarios');
});


//Exportar
module.exports = router;