const Apartment = require("../models/apartment.model");

const getNewApartmentForm = (req, res) => {
    res.render('new-apartment-form');
}

const postNewApartment = async (req, res) => {
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