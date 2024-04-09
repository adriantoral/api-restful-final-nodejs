# API RESTFul con Node.js

## DESCRIPCIÓN DEL PROYECTO

Se desea crear una aplicación para que cualquier comercio registrado pueda subir sucontenido (fotos, texto, etc) y pueda visualizarse cuando los usuarios busquen por loscomercios de una ciudad y de una actividad concreta.

## ALCANCE DEL PROYECTO

Se creará un back-end implementando un API Restful y una base de datos.

## IMPLEMENTACIÓN TÉCNICA

Para el desarrollo del back-end se utilizará node.js y para la base de datos, puede serrelacional o noSQL (está abierto).

## DETALLES

Habrá cuatro tipos de cliente: admins, comercios, usuarios anónimos y usuarios registrados.
El comercio se registrará por un admin enviando, al menos, la siguiente información:

- Nombre del comercio.
- CIF
- Dirección
- E-mail
- Teléfono de contacto

Una vez registrado, al comercio se le facilitará un token JWT y un Id de página con los cuales podrá subir su contenido:

- Ciudad- Actividad
- Título- Resumen
- [Textos]
- [Fotos]
- Datos no modificables por el comercio
- Scoring
- Número de puntuaciones
- Reseñas

El usuario puede ser anónimo (consultas) o estar registrado para recibir ofertas de suciudad:

- Nombre
- E-mail
- Password
- Edad
- Ciudad
- Intereses
- PermiteRecibirOfertas

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/adriantoral/api-restful-final-nodejs.git
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