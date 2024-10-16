const apiControllers = require('../controllers/api.controller')

const express = require('express');
const router = express.Router();

// 1. Obtener todos los apartamentos
router.get('/apartments', apiControllers.getApartments);

// 3. Buscar apts por nombre/descripción

module.exports = router;