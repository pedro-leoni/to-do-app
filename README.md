
## To-Do App 

Esta app esta creada con Typescript, NextJs y PostgreSQL con el fin de aprender a usar Typescript y NextJs. 

Importante: 
En caso de realizar pruebas en local debe crear la database y realizar un llamado a la ruta que creara la tabla correspondiente
http://localhost:3000/api/setupDatabase

LINK DEL DEPLOY: 

https://to-do-app-mu-five.vercel.app/

## Rutas del front
/ -> renderiza taskslist || nodata
/tasks/new -> nueva task
/tasks/[id] -> vista especifica de una task
/tasks/edit/[id] -> vista de edicion
