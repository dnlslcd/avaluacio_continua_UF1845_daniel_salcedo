// rutas de administrador

const express = require('express');
const router = express.Router();

// importamos todos los controladores de controllers/admin.controller.js
const adminControllers = require('../controllers/admin.controller')

// crear primer endpoint de admin que muestre un formulario para añadir un nuevo apartamento
router.get('/apartment/new-apartment', adminControllers.getNewApartmentForm);
router.post('/apartment/new-apartment', adminControllers.postNewApartment)

// EDITAR apt
// 1. ruta /admin/apartment/:idApartment/edit
router.get('/apartment/:idApartment/edit', adminControllers.updateById);

module.exports = router;
