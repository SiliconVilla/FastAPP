const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
/*  PASSPORT SETUP  */
const passport = require('passport');
const googleid = require('./googleid');
const GoogleStrategy = require('passport-google-oauth2');
var userProfile;
//const { estaLogueado, noEstaLogueado } = require('./rutas/auth');
const db = require('./keysfirebase');

const app = express();


const session = require('express-session');

//Configuraciones iniciales
app.set('port', 7000);
app.set('views', path.join(__dirname, 'vistas'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//routes files and css
app.use(express.static('.'));
app.set(express.static(path.join(__dirname, 'src/publico')));

//Sesion
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SecretCode2021*'
}));



//Conectores
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//Variables Globales
app.use((req, res, next) => {
    app.locals.agregado = req.flash('agregado');
    app.locals.user = req.user;
    app.locals.usuario = req.user;
    next();
});

//Rutas
app.use(require('./rutas/productos'));
app.use(require('./rutas/ventas'));
app.use(require('./rutas/login'));
app.use(require('./rutas/usuarios'));



passport.use(new GoogleStrategy({
    clientID: googleid.GOOGLE_CLIENT_ID,
    clientSecret: googleid.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

//Envío referencia login para evitar el navbar
const refLogin = "Página Lógin";


    
//Error de autenticación
app.get('/error', (req, res) => res.send("error logging in"));

//LLamada a login con google
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

//Respuesta a login con google
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    console.log(req.user);
    //console.log(req.user.displayName);
    //Crear usuario al loguear
    const email = req.user.email;

    db.ref('usuarios').orderByChild('email').equalTo(email).once('value', (snapshot) => {
        const data = snapshot.val();
        console.log('Datos desede la bd --> ', data);
        if(data != null){
            //res.render('productos/listadoProductos', { productos: data, usuario: req.user });
        } else {
            const estado = "Pendiente";
            const rol = "Usuario";
            const nombre = req.user.displayName;
            //email = req.user.email;
            const nuevoUsuario = {
                nombre,
                email,
                rol,
                estado
            };
            db.ref('usuarios').push(nuevoUsuario);
        }
        
        //console.log('Datos desede la bd --> ', data);
    });

    


    db.ref('productos').orderByChild('estado').equalTo("Activo").once('value', (snapshot) => {
        const data = snapshot.val();
        
        if(email == "asocia2.co@gmail.com"){
            app.locals.rol = "Administrador"
            res.render('productos/listadoProductos', { productos: data, usuario: req.user });
            console.log('Datos desede la bd --> ', req.user.displayName);
        } else {
            app.locals.rol = "Vendedor"
            res.render('productos/listadoProductos', { productos: data, usuario: req.user  });
            console.log('Datos desede la bd --> ', req.user.displayName);
        }

        
        //console.log('Datos desede la bd --> ', data);
    });
    //res.redirect('/productos', {usuario: req.user});
  });

  //Logout
app.get('/logout', (req, res) => {
        req.logOut();
        res.redirect('/');
    });

    //Listar Productos y será la raíz donde redirije al autenticar

/*app.get('/', (req, res) => {
    //res.send('Listado de productos, configurar la vista');
    db.ref('productos').orderByChild('estado').equalTo("Activo").once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('productos/listadoProductos', { productos: data, usuario: userProfile });
        console.log('Datos desede la bd --> ', data);
    });
    
});*/

//Exportar el módulo
module.exports = app;