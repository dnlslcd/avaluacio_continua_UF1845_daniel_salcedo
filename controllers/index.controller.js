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

const getApartmentById = async (req, res) => {
    // en el modelo obtengo el apartamento dado su id
    const { idApartment } = req.params;

    const selectedApartment = await Apartment.findById(idApartment);

    res.render('detailed-view-apartment', {
        selectedApartment
    });
};

const searchApartments = async (req, res) => {
    // parsear la query string que recibo del formulario
    const { maxPrice } = req.query;

    // obtener del modelo los apts cuyo precio sea menor al deaseado por el usuario

    // pasarle a la vista los apts filtrados
    const apartments = await Apartment.find({
        price: {$lte: maxPrice}
    });

    res.render('home', {
        apartments
    });
};

// Aquí module.exports exporta más de un recurso, como si fuera un objeto
module.exports = {
    getApartments,
    getApartmentById,
    searchApartments
}