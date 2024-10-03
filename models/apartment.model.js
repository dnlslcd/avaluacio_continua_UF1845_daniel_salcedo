// Crear el esquema del apartamento

const { Schema, model } = require('mongoose');
const { type } = require('os');
const { boolean } = require('webidl-conversions');


const apartmentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true,
        min: 0
    },
    mainPhoto: {
        type: String,
        required: true,
    },
    services: {
        type: Object,
        default: {
            WiFi: {type: Boolean, default: false},
            airConditioning: {type: Boolean, default: false},
            kitchen: {type: Boolean, default: false},
            disabilityInclusive: {type: Boolean, default: false},
            heating: {type: Boolean, default: false},
            tv: {type: Boolean, default: false}            
        }
        
}
    // services: {
    //     type: [String], // enum
    //     validate: {
    //         validator: function (v) {
    //             return "Devuelve false si el valor 'v' a insertar no es Wifi o Kitchem o Air conditionating bla bla"
    //         },
    //         message: props => `${props.value} is not a valid service!`
    //     },
    // }

});

const Apartment = model("apartment", apartmentSchema); // modelo de un apartamento. Contenido de sintáxis en el paréntesis: model("nombre de la colección", "nombre del schema") 
module.exports = Apartment; // exportamos el modelo para poder usarlo en otros archivos. Con module.exports se exporta un único recurso