const Apartment = require("../models/apartment.model");

const getApartments = async (req, res) => {
    // 1. ir al modelo y obtener todos los apartamentos (hasta 100.000)
    const apartments = await Apartment.find().limit(100000);
    // 2. devolver una respuesta json
    return res.status(200).json({
        message: "Query excecuted succesfully",
        results: apartments
    });
};

module.exports = {
    getApartments
};