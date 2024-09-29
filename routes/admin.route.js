// rutas de administrador

// rutas publicas
const express = require('express');
const router = express.Router();

// importamos todos los controladores de controllers/admin.controller.js
const adminControllers = require('../controllers/admin.controller')

// crear primer endpoint de admin que muestre un formulario para añadir un nuevo apartamento
router.get('/apartment/new-apartment', adminControllers.getNewApartmentForm);

module.exports = router;
