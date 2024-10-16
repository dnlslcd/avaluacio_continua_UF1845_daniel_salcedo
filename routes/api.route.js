const apiControllers = require('../controllers/api.controller')

const express = require('express');
const router = express.Router();
const { query } = require('express-validator');

// 1. Obtener todos los apartamentos
router.get('/apartments', query("limit")
.optional()
.isInt({ 
    min: 1, 
    max: 100000
})
.withMessage('"limit" parameter must be a number between 1 and 100.000'), 
apiControllers.getApartments);

// 3. Buscar apts por nombre/descripción   

module.exports = router;