var express = require('express');
var router = express.Router();

var funciones = require('../funciones')

// const auth = require('../middlewares/auth');

router.get('/newOrder', async (req, res) => {
    // let fecha = new Date.now()
    let date = new Date()
    let expireDate = new Date()
    let listadoParaFiltrar = await funciones.peliculas();
    let rentedMovie = {}

   listadoParaFiltrar.forEach(element => {
        if (element.id == req.query.id) {
            rentedMovie = element.original_title
        }
    });

    res.json({
        rented_movie: rentedMovie,
        rent_date: date.toLocaleDateString(),
        rent_time: '7 days',
        expire_date: expireDate.toLocaleDateString(expireDate.setDate(expireDate.getDate() + 7))
    })
})

module.exports = router;