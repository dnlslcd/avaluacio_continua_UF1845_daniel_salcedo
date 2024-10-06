// rutas de administrador

const express = require('express');
const router = express.Router();

// importamos todos los controladores de controllers/admin.controller.js
const adminControllers = require('../controllers/admin.controller')
const indexControllers = require('../controllers/index.controller')

// crear primer endpoint de admin que muestre un formulario para añadir un nuevo apartamento
router.get('/apartment/apartment-form', adminControllers.getApartmentForm);
router.post('/apartment/apartment-form', adminControllers.postAddNewApartment)

// EDITAR apt Versión 2
// 1. ruta /admin/apartment/:idApartment/edit
router.get('/apartment/:idApartment/edit', adminControllers.getEditApartmentForm);

router.get('/apartment/:idApartment', indexControllers.getApartmentById);

module.exports = router;
