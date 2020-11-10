//requerimos la libreria de mongoose
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let quotesschema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    lastName: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    identification: {
        type: String,
        required: [true, 'La identificacion es necesaria']
    },
    birthDate: {
        type: String,
        required: [true, 'La fecha es necesaria']
    },
    phone: {
        type: String,
        required: [true, 'El telefono es necesario']
    },
    city: {
        type: String,
        required: [true, 'La ciudad es necesaria']
    },
    neighborhood: {
        type: String,
        required: [true, 'El barrio es necesario']
    }
});

module.exports = mongoose.model('QuotesMoviles', quotesschema);