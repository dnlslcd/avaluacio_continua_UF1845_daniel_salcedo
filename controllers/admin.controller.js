const Apartment = require("../models/apartment.model");

const getNewApartmentForm = (req, res) => {
    res.render('new-apartment-form');
}

const postNewApartment = async (req, res) => {
    
    // EDITAR apt
    // 4. como detecto si estoy añadiendo o editando un apt? Si lo estoy editando ya tengo el _id
    const { id } = req.body;
   
    if (id) {
        // 1. buscar el doc en la bbdd a partir de su id y actualizar sus campos a partir del req.body
        
        res.send('Apartamento actualizado');
        return
    };
    await Apartment.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        size: req.body.size,
        mainPhoto: req.body.mainPhoto,
        numberRooms: req.body.numberRooms,
        numberTotalBeds: req.body.numberTotalBeds,
        numberBathrooms: req.body.numberBathrooms,
        maxCapacity: req.body.maxCapacity,
        houseRules: req.body.houseRules
    });

    res.send('Apartment created')
}


// named exports
module.exports = {
    getNewApartmentForm,
    postNewApartment
}