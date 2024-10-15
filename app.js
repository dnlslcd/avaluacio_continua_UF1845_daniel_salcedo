/* MÓDULOS DE TERCEROS*/
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");

const dotenv = require("dotenv");
dotenv.config();

// importar rutas publicas
const indexRoutes = require("./routes/index.route");

// importar rutas de administrador
const adminRoutes = require("./routes/admin.route");

// importar ruta api pública
const apiRoutes = require("./routes/api.route");

// instancia del servidor Express
const app = express();

// middleware para indicar a Express que queremos hacer peticiones POST
app.use(express.urlencoded({ extended: true }));

// BASIC AUTH
// 1.
app.use(
  session({
    secret: "miSecretoSuperSecreto", // Cambia esto a algo más seguro en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // secure: true en producción con HTTPS
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.get("/login", (req, res) => {
  res.send(`
            <form method="POST" action="/login">
                <input type="text" name="username" placeholder="Usuario" required />
                <input type="password" name="password" placeholder="Contraseña" required />
                <button type="submit">Log in</button>
            </form>
        `);
});


const USERNAME = "dani"
const PASSWORD = "dani"

app.post("/login", (req, res) => {
    // obtener el usuario y contraseña del formulario
  const { username, password } = req.body;

    // si las credenciales coinciden con el de nuestra bbdd, entonces está autentificado
  if (username === USERNAME && password === PASSWORD) {
    req.session.isAuthenticated = true;
    res.locals.isAdmin = true;
    res.redirect("/");
  } else {
    res.send("Wrong credentials.");
  }
});

// endpoint para el logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error while logging out');
        }
        res.redirect('/login');
    });
});

// Basic "auth"
// 1.
app.use((req, res, next) => {
  res.locals.isAdmin = false;
  next();
});

// middleware para que el cliente pueda hacer GETs a los recursos publicos en la carpeta 'public'
app.use(express.static("public"));

// variable donde se indica nuestro puerto
const PORT = process.env.PORT;

// especificar EJS como motor de plantillas
app.set("view engine", "ejs");

// middleware para loggear las peticiones
app.use(morgan("tiny"));

// añadimos las rutas de index.js en nuestra app
// significado de los parametros: todas las rutas en "indexRoutes" estarán prefijadas por "/"
app.use("/", indexRoutes);

// middleware para proteger las rutas de admin
app.use('/admin', (req, res, next) => {
    // miramos si el usuario está autenticado
    if (req.session.isAuthenticated) {
        // si es asi, es de tipo admin y permitimos seguir la peticion
        res.locals.isAdmin = true;
        next();
    } else {
        // si no, lo llevamos  la vista de login
        res.redirect('/login');
    }
});

// rutas de admin.js
// prefijar las rutas de administrador con '/admin'
app.use("/admin", adminRoutes);

// rutas de api
app.use("/api", apiRoutes);

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Conectado a la base de datos");
}

connectDB().catch((err) =>
  console.log("Error al conectarse a la base de datos " + err)
);

// levanto servidor
app.listen(PORT, (req, res) => {
  console.log("Servidor corriendo en el puerto " + PORT);
});
