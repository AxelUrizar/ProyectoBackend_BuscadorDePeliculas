const axios = require('axios');

const peliculas = async () => {
    const resource = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&page=1');
    const shownMovies = resource.data.results;

    return shownMovies
}

const NombrePeliculas = async (listadoPeliculas) => {
    let devolver = [];
    for (const pelicula of await listadoPeliculas) {
        devolver.push({
            id: pelicula.id,
            titulo: pelicula.original_title,
            fecha_salida: pelicula.release_date 
        })
    }

    return devolver
}

module.exports = { NombrePeliculas, peliculas }