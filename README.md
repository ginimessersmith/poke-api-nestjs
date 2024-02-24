<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```

3. Tener el Nest CLI instalado
```
npm i -g @nest/cli
```

3. Levantar la base de datos
```
docker-compose up -d
```
4. Construir la Base de Datos
```
GET http://localhost:3000/api/v2/seed
```
5. Clonar el ```.env.example``` y renombrar a ```.env```

6. Rellenar las varibles de entorno definidas en el ``` .env.example```

## Stack usado

* MongoDB
* NestJs
