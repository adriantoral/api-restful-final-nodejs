# API RESTFul con Node.js

Realiza una aplicación de backend con nodejs que implemente una API RESTful, tal que:

- Crea una app.js y un modelo con mongoose (y su configuración de conexión a mongodb, con la uri en .env) para un comercio con, al menos, los siguientes campos:(1.5 puntos)
    - Nombre del comercio (String)
    - CIF (String)
    - Dirección (String)
    - E-mail (String)
    - Teléfono de contacto (String)
    - Id de página (Number)
- Crea rutas y sus respectivos controladores (por separado) para:
    - Obtener la lista de comercios y, opcionalmente (vía parámetro query,) ordenados por el CIF ascendentemente.
    - Obtener un comercio por su CIF
    - Guardar un comercio
    - Modificar un comercio a partir de su CIF
    - Borrar un comercio a partir de su CIF, y permite elegir entre un borrado lógico ofísico (vía parámetro query)(3 puntos)
- Crea validadores (middleware) para comprobar cada uno de los campos al crear unnuevo comercio o modificar uno existente, de modo que después puedas usar matchedData() en los controladores.(1.5 puntos)
- Implementa gestión de errores (crea una función para ello y llámala en caso de errores)(1 punto)
- Crea un cliente (tipo index.http o postman) para realizar las llamadas necesarias (GET detodos los comercios, GET de uno, POST, PUT y DELETE)(1 punto)
- Con tus propias palabras, documenta cada una de las partes anteriores, con comentariosen el código que expliquen teóricamente cada una de las funciones.(2 puntos)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/adriantoral/api-restful-nodejs.git
cd api-restful-nodejs/source

# Instalar dependencias
npm install

# Crear archivo .env
# El archivo .env debe contener:
#   - PORT (Int)
#   - MONGO_URI (MongoDB URI)
touch .env

# Ejecutar la aplicación
npm start
```