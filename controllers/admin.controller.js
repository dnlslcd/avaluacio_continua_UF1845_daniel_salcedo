const Apartment = require("../models/apartment.model");

const getApartmentForm = (req, res) => {
    
    res.render('apartment-form', {
        apartment: {}
    });
}

// EDITAR apt. Versión 1) usando una funcion distinta a getNewApartmentForm
const getEditApartmentForm = async (req, res) => {
        // 1. recuperar el apt identificado por su idApartment (tiene que ser el mismo nombre que aparece en la ruta despues de los : "/apartment/:idApartment/edit") en la bbd
        const { idApartment } = req.params;

        // 2. obtener apt via id usando .findById
        const apartment = await Apartment.findById(idApartment);
        
        // 3. renderizar el apt a la vista para editar los campos
        res.render('apartment-form',{
            apartment
        });
    };

const postAddNewApartment = async (req, res) => {
    
    // EDITAR apt Versión 2) aprovechando el endpoint "/admin/apartment/new-apartment" 
    // 4. como detecto si estoy añadiendo o editando un apt? Si lo estoy editando ya tengo el id (atributo name en el form)
    const { id } = req.body;
   
    if (id) {
        // 4.1. buscar el doc en la bbdd a partir de su id y actualizar sus campos a partir del req.body
        await Apartment.findByIdAndUpdate(id, req.body);

        // 4.2. renderizar de nuevo la vista de editar con un mensaje de éxito, o bien devolver la vista detallada del apt
        // req.flash('success_msg', `Apartment ${req.body.title} edited succesfully.`);
        
        // req.get('referer') -> redirige a la ruta anterior
        return res.redirect('/apartment/' + id);
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

    req.flash('success_msg', `Apartment ${req.body.title} created succesfully.`);

    res.redirect('/');
}


// named exports
module.exports = {
    getApartmentForm,
    postAddNewApartment,
    getEditApartmentForm
}