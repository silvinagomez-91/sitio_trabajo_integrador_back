var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

/*diseño del formulario*/

router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

/*destruir sessiones>*/

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

/*procesar el formulario a traves del metodo post */

router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;

        var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

        if (data != undefined) {
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;

            res.redirect('/admin/novedades');

        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
