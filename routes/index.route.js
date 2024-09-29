// rutas públicas
const express = require('express');
const router = express.Router();

// importamos todos los controladores de controllers/index.controller.js
const indexControllers = require('../controllers/index.controller');

// Router funciona igual que "app" para definir un conjunto arbitrario de endpoints
router.get('/', indexControllers.getApartments);

// Exportar las rutas para que se puedan usar en app.js
module.exports = router;