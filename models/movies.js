const mongoose = require('mongoose')

const movie = new mongoose.Schema({
     name:{
        type: String,
        required: true
     },
     image: {
        type: String,
        required: true
     },
     description: {
        type: String,
        required: true
     },
     ranking: {
        type: String,
        required: true
     }
})

module.exports = mongoose.model('movies', movie)