var express = require('express');
var router = express.Router();

const funciones = require('../funciones')

router.get('/', async (req, res) => {
    // console.log(await funciones.peliculas())
    res.json(await funciones.NombrePeliculas(funciones.peliculas()))
})

router.get('/id/:id', async (req, res) => {
    let listadoPeliculas = [];
    let listadoParaFiltrar = await funciones.peliculas();
    listadoParaFiltrar.forEach(element => {
        if (element.id == req.params.id) {
            listadoPeliculas.push(element)
        }
    });
    res.json(await funciones.NombrePeliculas(listadoPeliculas))
})

router.get('/search', async (req, res)=>{
    console.log('entrada funcion')
    let listadoPeliculas = [];

    for (const pelicula of await funciones.peliculas()) {
        let textoBuscado = req.query.title.toLowerCase();
        let titulo = pelicula.original_title.toLowerCase();

        if (titulo.indexOf(textoBuscado) !== -1) {
            listadoPeliculas.push(pelicula);
        }
    }
    
    res.json(await funciones.NombrePeliculas(listadoPeliculas))
})


module.exports = router;