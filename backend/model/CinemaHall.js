const mongoose = require('mongoose')

const cinemaHallSchema = new mongoose.Schema({
    cinemaId: {
        type: mongoose.ObjectId,
        required: true
    },
    rows: {
        type: Number,
        required: true
    },
    cols: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    }
})

module.exports = mongoose.model('CinemaHall', cinemaHallSchema)