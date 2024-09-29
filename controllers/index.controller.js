// crear funciones que den respuestas a las rutas

const getApartments = (req, res) => {
    res.render('home');
}

// Aquí module.exports exporta más de un recurso, como si fuera un objeto
module.exports = {
    getApartments
}