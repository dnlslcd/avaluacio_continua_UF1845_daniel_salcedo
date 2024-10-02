const Apartment = require("../models/apartment.model");

const getApartmentForm = (req, res) => {
    res.render('new-apartment-form');
}

// EDITAR apt. Versión 1) usando una funcion distinta a getNewApartmentForm
const getEditApartmentForm = async (req, res) => {
        // 1. recuperar el apt identificado por su idApartment (tiene que ser el mismo nombre que aparece en la ruta despues de los : "/apartment/:idApartment/edit") en la bbd
        const { idApartment } = req.params;

        // 2. obtener apt via id usando .findById
        const apartment = await Apartment.findById(idApartment);
        
        // 3. renderizar el apt a la vista para editar los campos
        res.render('new-apartment-form',{
            apartment
        });
    };

const postNewApartment = async (req, res) => {
    
    // EDITAR apt
    // 4. como detecto si estoy añadiendo o editando un apt? Si lo estoy editando ya tengo el _id
    // const { id } = req.body;
   
    // if (id) {
    //     // 4.1. buscar el doc en la bbdd a partir de su id y actualizar sus campos a partir del req.body
    //     await Apartment.findByIdAndUpdate(id, req.body);
    //     res.send('Apartamento actualizado'); // FALTA: 4.2. renderizar de nuevo la vista de editar con un mensaje de éxito, o bien devolver la vista detallada del apt
    //     return;
    // };

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
    getApartmentForm,
    postNewApartment,
    getEditApartmentForm
}