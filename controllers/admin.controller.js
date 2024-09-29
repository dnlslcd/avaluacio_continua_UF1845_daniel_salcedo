const Apartment = require("../models/apartment.model");

const getNewApartmentForm = (req, res) => {
    res.render('new-apartment-form');
}

const postNewApartment = async (req, res) => {
    await Apartment.create({
        title: req.body.title,
        price: req.body.price,
        size: req.body.size,
        mainPhoto: req.body.mainPhoto
    });

    res.send('Apartment created')
}


// named exports
module.exports = {
    getNewApartmentForm,
    postNewApartment
}