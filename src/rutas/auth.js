module.exports = {
    estaLogueado(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        return res.redirect('/');
    },

    noEstaLogueado(req, res, next){
        if (!req.isAuthenticated()){
            return next();
        }
        //return res.redirect('/productos');
    }

};