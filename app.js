/* MÓDULOS DE TERCEROS*/
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

// importar rutas publicas
const indexRoutes = require('./routes/index.route');

// importar rutas de administrador
const adminRoutes = require('./routes/admin.route');

// instancia del servidor Express
const app = express();

// middleware para indicar a Express que queremos hacer peticiones POST
app.use(express.urlencoded({extended: true}));



// middleware para que el cliente pueda hacer GETs a los recursos publicos en la carpeta 'public'
app.use(express.static('public'));

// variable donde se indica nuestro puerto
const PORT = process.env.PORT;

// especificar EJS como motor de plantillas 
app.set('view engine', 'ejs');

// middleware para loggear las peticiones
app.use(morgan('tiny'));

// añadimos las rutas de index.js en nuestra app
// significado de los parametros: todas las rutas en "indexRoutes" estarán prefijadas por "/"
app.use('/', indexRoutes);

// rutas de admin.js
// prefijar las rutas de administrador con '/admin'
app.use('/admin', adminRoutes);

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos');
}

connectDB().catch(err => console.log('Error al conectarse a la base de datos ' + err));

// levanto servidor
app.listen(PORT, (req, res) => {
    console.log('Servidor corriendo en el puerto ' + PORT);
});
