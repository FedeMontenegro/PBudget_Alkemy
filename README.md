# PBudget

## Descripción: 
PBudget es una aplicación web para gestionar el presupuesto personal. En ella, 
se pueden agregar las operaciones que se quieran registrar, pudiendo organizar
las mismas por concepto, categorias, tipo de operacion, monto y fecha de creación.
Las categorías deben ser creadas por el usuario, pudiendo así categorizar las operaciones
por las que resulten pertinentes y además pudiendo agregar de manera ilimitada
las que se requieran. Se puede obtener un listado de las operaciones realizadas, pudiendo
ser editadas o eliminadas, de la misma manera en que se pueden gestionar las categorías,
con las mismas opciones. Se puede observar el balance actual, resultante de los montos de las
distintas operaciones realizadas. Además, es posible crearse una cuenta personal en el sitio,
en la que guardar todos los registros que se vayan realizando en la plataforma.

## Desarrollo:

La aplicación ha sido desarrollada empleando buenas prácticas del Modelo Vista Controlador.

**user**: Desarrollado con React.js y vanilla JavaScript. Estilos trabajados con Css puro y Bootstrap.

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

---

### Tareas completadas

- Home, con el balance actual, mas el ranking de operaciones.
- ABM de Operaciones.
- Listado de operaciones ordenadas según su tipo (ingreso, egreso).
- Posibilidad de crear, editar y eliminar categorías, para organizar las operaciones.
- Inicio de sesión y registro de usuario.
- Base de datos, con su Diagrama Entidad Relación.
- Diseño responsive.
- APIs necesarias para la interacción con la base de datos.

### Tareas pendientes

- Posibilidad de listar las operaciones por categoría.
- Commits declarativos y atomizados.


---


## Description:
PBudget is a web application to manage personal budget. In it, you can add the operations that you want to register, being able to organize them by concept, categories, type of operation, amount and date of creation. The categories must be created by the user, thus being able to categorize the operations by which they are pertinent and also being able to add those that are required in an unlimited way. You can get a list of the operations carried out, which can be edited or deleted, in the same way that you can manage the categories, with the same options. You can see the current balance, resulting from the amounts of the different operations carried out. In addition, it is possible to create a personal account on the site, in which to save all the records that are made on the platform.

## Developing:
The application has been developed using good practices of the Model View Controller.

**user**: Developed with React.js and vanilla JavaScript. Styles worked with pure Css and Bootstrap. 

**server**: Developed with Node.js, Express, Sequelize for database interaction, and vanilla JavaScript. 

**Database**: It is of the relational type, developed with the MySql database engine. 

**"DER PBudget database.png"**: Entity Relationship Diagram of the database.

## How to raise the project locally:

- You must clone the project from the GitHub repository, previously opening the terminal in the folder where you want to put it and then entering the command "git clone https://github.com/FedeMontenegro/PBudget_Alkemy.git" (without the quotation marks).

- Later, go to the "server" folder using the "cd server" command. Once there, enter the command "npm install". Then execute the command "nodemon", to start the server.

- Exit the "server" folder with the command "cd .." and perform the procedure in the previous step with the "user" folder. Then run the command "npm start", to run React.

- Next, navigate to the "server/src/database/" path and use the "pbudget_db.sql" file, which is a script that must be run on a suitable platform in order to install the database on your computer. local. Programs like DBeaver, Workbench or phpMyAdmin can be used to host the database. Depending on the case, it may be necessary to install the "xaamp" program and start the "apache" and "mysql" servers to be able to interact with the database from the project.

If the process was carried out successfully, you will be ready to test the application.

---

### Completed tasks:

- Home, with the current balance, plus the ranking of operations.
- Operations ABM.
- List of operations ordered according to their type (entry, expense).
- Ability to create, edit and delete categories, to organize operations.
- Login and user registration.
- Database, with its Entity Relationship Diagram.
- Responsive design.
- APIs necessary for interaction with the database.

### Pending tasks:
- Possibility of listing operations by category.
- Declarative and atomized commits.
