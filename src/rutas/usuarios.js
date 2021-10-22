const { Router } = require('express');
const router = Router();
const db = require('../keysfirebase');
const estados = [
    {'nombre' : 'pendiente'},
    {'nombre' : 'autorizado'},
    {'nombre' : 'no autorizado'}
];
const roles = [
    {'nombre' : 'administrador'},
    {'nombre' : 'vendedor'},
];

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
    res.render('usuarios/agregarUsuarios',{activeUsuarios: true, estados : estados, roles : roles});
});

router.post('/agregarUsuarios/', (req, res) => {
    const { nombre, correo, rol, estado } = req.body;
    const nuevoUsuario = {
        nombre,
        correo,
        rol,
        estado
    };
    db.ref('usuarios').push(nuevoUsuario);
    res.redirect('/usuarios');
});


//Exportar
module.exports = router;