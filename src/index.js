const app = require('./app');

app.listen(app.get('port'), () => {
    console.log('Servidor iniciado correctamente - NODEJS, por el puerto --> ', app.get('port'));
});