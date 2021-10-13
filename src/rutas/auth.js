module.exports = {
    estaLogueado(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        return res.redirect('/login');
    },

    noEstaLogueado(req, res, next){
        if (!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }

};