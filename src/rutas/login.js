const { Router } = require('express');
const router = Router();
//Conectar a Base de Datos

//Login
router.get('/login', (req, res) => {
    //console.log(req,res);
    const refLogin = "Página Lógin";
    res.render('login/index', {referencia: refLogin});
});

//Exportar
module.exports = router;