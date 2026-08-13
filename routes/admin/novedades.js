var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel')

router.get('/', async function (req, res, next) {

    var novedades = await novedadesModel.getNovedades();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario:req.session.nombre, novedades
    });
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.servicios != "" && req.body.precioargentina != "" && req.body.preciointernacional != "") {
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            }) 
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo la novedad'
        })
    }
})

/*para eliminar una novedad*/

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('/admin/novedades');
});

/*para UNA SOLA novedad*/

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
   
    var novedad = await novedadesModel.getNovedadesById(id);

    res.render('admin/modificar', {
        layout: 'admin/modificar',
        novedad
    })
});

router.post('/modificar', async (req, res, next) => {
    try {

        var obj = {
            titulo: req.body.servicios,
            subtitulo: req.body.precioargentina,
            cuerpo: req.body.preciointernacional
        }
        

        await novedadesModel.modificarNovedadById(obj, req.body.id);
        res.redirect('/admin/novedades');
    } catch (error) {
        
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico la novedad'
        })
    }
})

module.exports = router;