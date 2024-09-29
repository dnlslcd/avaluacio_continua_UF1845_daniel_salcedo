// Aquí se crean funciones que den respuestas a las rutas


// importamos el modelo
const Apartment = require('../models/apartment.model');

const getApartments = async (req, res) => {
    
    // obtenemos todos los apartamentos de la bbdd
    const apartments = await Apartment.find();
    
    res.render('home', {
        apartments
    });
}

// Aquí module.exports exporta más de un recurso, como si fuera un objeto
module.exports = {
    getApartments
}