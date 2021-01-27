# Trianafy
Proyecto sobre APIs

Se trata de una APIRest de música en la que los usuarios pueden subir y gestionar canciones, y sus propias listas además,  
podrán ver las listas de reproducción públicas de otros usuarios.

A continuación hablaremos de las rutas.

## Rutas
---

Las dividiremos en rutas de canciones, de listas, y de autorización.

### Autorización (/auth):

Primero tenemos el registro(método POST), que será la ruta /register. A esta ruta se le pasarán obligatoriamente los cuatro datos del usuario,  
el nombre(name), el usuario(nick), el email(email) y la contraseña(password).

La ruta del login(método POST), /login requerirá del email y la contraseña(password). No exige los datos pero no se podrá autenticar sin ellos.

Finalmente en esta sección tenemos /me (método GET) la cual nos mostrará mçnuestra información excepto la contraseña.

### Canciones (/songs):

**Todas estas peticiones requeriran del token de sesión.**

- Obtener todas las canciones(método GET): /

- Obtener una canción concreta(método GET): /:id . Esta ruta requiere que se le pase el id de la canción a buscar.

- Introducir una canción (método POST): / . Requiere que se le pase el título(title), los demás atributos son optativos: album, artist, year.

- Actualizar una canción (método PUT): /:id. Requiere el id de la canción a actualizar además de los atributos que se quiera modificar: title,  
 album, artist, year.

- Borrar una canción (método DELETE): /:id. Requiere del id de la canción que se desee borrar.

### Listas (/lists):

**Todas estas peticiones requeriran del token de sesión.**

- Mostrar las listas públicas (método GET): /publicas .

- Mostrar las listas personales (método GET): / .

- Introducir nueva lista (método POST): / . Requiere del nombre(name) y si es pública(publica: Boolean), adicionalmente se le puede dar una  
descripción(description).

- Mostrar una lista personal específica (método GET): /:id . Requiere del id de la lista personal a mostrar.

- Actualizar una lista personal (método PUT): /:id . Requiere del id de la lista a actualizar. Se le pueden dar los valores nombre(name),  
descripción(description) y si es pública o no(publica).

- Eliminar lista personal (método DELETE): /:id . Requiere del id de la lista personal a eliminar.

- Mostrar las canciones de una lista personal (método GET): /:id/songs . Requiere del id de la lista sobre la que consultar canciones.

- Añadir canción a una lista personal (método POST): /:id/songs/:idC . Requiere de los id de la lista personal y de la canción a añadir.

- Mostrar información de una canción específica de una lista personal (método GET): /:id/songs/:idC. Requiere de los id de la lista y de la canción.

- Eliminar una canción de una lista personal (método DELETE): /:id/songs/:idC . Requiere de los id de la lista personal de la que eliminar  
la canción y el id de esta.

## Datos del fichero .env
---

---
PORT=45032

Secreto para la encriptación:
JWT_SECRET=secreto

Número de rondas utiliadas para el algoritmo de hashing de la contraseña:
BCRYPT_ROUNDS=12

Vida del token:
JWT_LIFETIME=1d

Algoritmo utilizado para el cifrado del token:
JWT_ALGORITHM=HS256

DB_URI=mongodb://localhost/mongoose
---

## Para iniciar
---

1) Comprobar que esté habilitado el servicio mongodb(service mongodb status).
2) Habilitar el servicio de mongodb si no lo está ya(service mongodb start).
3) Introducir en la consola el comando `npm start`.
4) Testear con Postman.