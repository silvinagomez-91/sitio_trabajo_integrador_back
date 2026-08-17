var express = require('express');
var router = express.Router();
var novedadesModel = require('./../models/novedadesModel');
var nodemailer = require('nodemailer');

router.get('/novedades', async function (req, res, next) {
    let novedades = await novedades.Model.getNovedades();

    res.json(novedades);
});

router.post('/contacto', async (req, res) => {
    const mail = {
        to: silgisegomez@gmail.com
        subject: 'Contacto web Kouro'
        html: `${req.body.nombre} se contactó a través de la web y quiere más información a este correo: ${req.body.mail} <br> Además, hizo el siguiente comentario: ${req.body.mensaje} <br> Su tel es: ${req.body.telefono} `
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail)

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    });
});

module.exports = router;

