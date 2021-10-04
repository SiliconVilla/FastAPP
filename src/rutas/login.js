const { Router } = require('express');
const router = Router();
//Conectar a Base de Datos

//Login
router.get('/login', (req, res) => {
    //console.log(req,res);
    res.render('login/index');
});

//Exportar
module.exports = router;