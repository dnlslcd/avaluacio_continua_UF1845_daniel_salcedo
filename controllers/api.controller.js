const Apartment = require("../models/apartment.model");
const { validationResult } = require('express-validator');

const getApartments = async (req, res) => {
    // 2. Limitar apts
    // 2.1. obtener de la query string el valor del parámetro limit
    const limit = req.query.limit || 100000;

    // 2.2. validaciones

    // if (limit < 1 || limit > 100000) {
    //     return res.status(400).json({
    //         message: "Limit parameter must be between 1 and 100000"
    //     })
    // }
    
    const result = validationResult(req);

    // si validationResult devuelve algun valor (si no está vacío), es que ha habido algún parámetro que no ha pasado la validación
    if (!result.isEmpty()){
        return res.status(400).json({
            message: result.array()[0].msg
        });
    };
    
    // 1.1. ir al modelo y obtener todos los apartamentos (hasta 100.000)
    const apartments = await Apartment.find().limit(limit);
    // 1.2. devolver una respuesta json
    return res.status(200).json({
        message: "Query excecuted succesfully",
        results: apartments
    });
};

module.exports = {
    getApartments
};