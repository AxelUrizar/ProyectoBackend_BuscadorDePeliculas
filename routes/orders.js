var express = require('express');
var router = express.Router();
var User = require('../models/User');

var funciones = require('../funciones')

// const auth = require('../middlewares/auth');

router.get('/newOrder', async (req, res) => {
    // let fecha = new Date.now()
    let date = new Date()
    let expireDate = new Date()
    let expireDateCalculated = expireDate.toLocaleDateString(expireDate.setDate(expireDate.getDate() + 7))
    
    let user = await User.findOne({_id:req.query.id})

    if (!user) return res.send('Usuario no válido')
    if (user.activeLoan == true) return res.send('This user already has one movie loaned')

    user.makeOrder()
//     let listadoParaFiltrar = await funciones.peliculas();
//     let rentedMovie = {}

//    listadoParaFiltrar.forEach(element => {
//         if (element.id == req.query.id) {
//             rentedMovie = element.original_title
//         }
//     });

    res.json({
        rented_movie: rentedMovie,
        rent_date: date.toLocaleDateString(),
        rent_time: '7 days',
        expire_date: expireDate.toLocaleDateString(expireDate.setDate(expireDate.getDate() + 7))
    })
    
})

module.exports = router;