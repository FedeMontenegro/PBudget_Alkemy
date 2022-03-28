# PBudget
---

## Descripción: 
PBudget es una aplicación web para gestionar el presupuesto personal. En ella, se pueden agregar las operaciones que se quieran registrar, pudiendo organizar
las mismas por concepto, categorias, tipo de operacion, monto y fecha de creación.
Las categorías deben ser creadas por el usuario, pudiendo así categorizar las operaciones
por las que resulten pertinentes y además pudiendo agregar de manera ilimitada
las que se requieran. Se puede obtener un listado de las operaciones realizadas, pudiendo
ser editadas o eliminadas, de la misma manera en que se pueden gestionar las categorías,
con las mismas opciones. Se puede observar el balance actual, resultante de los montos de las
distintas operaciones realizadas. Además, es posible crearse una cuenta personal en el sitio,
en la que guardar todos los registros que se vayan realizando en la plataforma.

---

## Desarrollo:

La aplicación ha sido desarrollada empleando buenas prácticas del Modelo Vista Controlador.

**user**: Desarrollado con React.js y vanilla JavaScript.
**server**: Desarrollado con Node.js, Express, Sequelize para la interacción con la base de datos y
vanilla JavaScript.
**Base de datos**: La misma es del tipo relacional, desarrollada con el motor de bases de datos MySql.
**"DER PBudget database.png"**: Diagrama Entidad Relación de la base de datos.

## Cómo levantar el proyecto a nivel local:

- Se debe clonar el proyecto desde el repositorio de GitHub, abriendo previamente la terminal en la carpeta
en la que se lo quiera destinar y luego ingresando el comando "git clone https://github.com/FedeMontenegro/PBudget_Alkemy.git" (sin las comillas).

- Posteriormente, ubicarse en la carpeta "server" por medio del comando "cd server". Una vez allí,
ingresar el comando "npm install". Luego ejecutar el comando "nodemon", para levantar el servidor.

- Salir de la carpeta "server" con el comando "cd .." y realizar el procedimiento del paso anterior con la carpeta "user". Luego ejecutar el comando "npm start", para ejecutar React.

- A continuación, se deberá navegar por la ruta "server/src/database/" y utilizar el archivo "pbudget_db.sql",
el cual es un script que se debe ejecutar en una plataforma adecuada para poder instalar la base de datos en el equipo local. Se pueden utilizar programas como DBeaver, Workbench o phpMyAdmin para alojar la base de datos.
Según el caso, quizá sea necesario instalar el programa "xaamp" y levantar los servidores "apache" y "mysql" para poder interactuar con la base de datos desde el proyecto.


Si el proceso fué llevado a cabo exitosamente, ya se estará listo para probar la aplicación.