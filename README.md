# ProyectoBackend_BuscadorDePeliculas

API con CRUD para la trata de un buscador de peliculas.

### Instalación 🔧

_Para instalar el proyecto deberás copiar en tu disco local el repositorio de GitHub con el siguiente comando:_

```
git clone https://github.com/AxelUrizar/ProyectoBackend_BuscadorDePeliculas
```

_Tras lo cual tendremos que installar las dependencias con:_

```
npm install
```
o

```
yarn install
```

## Ejecutando las pruebas ⚙️

_Para probar el proyecto usaremos Postman mandando peticiones a todos los endpoints_

Endpoints Usuarios:

* Mostrar todos los usuarios: (GET "/users")

* Registrar nuevo usuario: (POST "/users/register") y pasamos por body con formato JSON los datos del nuevo usuario.

* Login a un usuario: (POST "/users/login") con lo que recibiremos un token para poder acceder a las funcionalidades como ver tu perfil o borrarlo.

* Mostrar tu perfil: (GET "users/profile") pasandole además un token de autentificación nos dejará acceder a nuestro perfil y ver nuestros datos.

* Borrar Usuario: (DELETE "users/delete/id_del_usuario_objetivo) Borrará el usuario indicado por id.

Endpoints Películas: 

* Mostrar todas las películas: (GET "/movies")

* Buscar película por ID: (GET "/movies/id/id_de_la_pelicula_indicada)

* Buscar película por query: (GET "/movies/search?title=nombre_de_la_pelicula)

Endpoints Pedidos: 

* Crear un pedido: (POST /orders/newOrder?id=usuario_que_hará_el_pedido)

## Construido con 🛠️

* Javascript
* Node.js
* MongoDB
* Express
* Postman

## Autores ✒️

* **Axel Urizar** - [GitHub](https://github.com/AxelUrizar)
