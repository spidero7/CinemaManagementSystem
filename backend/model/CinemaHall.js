const mongoose = require('mongoose')

const cinemaHallSchema = new mongoose.Schema({
    cinemaId: {
        type: mongoose.ObjectId,
        required: true
    },
    rows: {
        type: Number,
        required: true,
        min: [1, "At least 1 row required"],
        max: [200, "Too many rows!"],
        validate: {
            validator: Number.isInteger,
            message: 'Row count is not an integer value'
        }
    },
    cols: {
        type: Number,
        required: true,
        min: [1, "At least 1 column required"],
        max: [200, "Too many columns!"],
        validate: {
            validator: Number.isInteger,
            message: 'Column count is not an integer value'
        }
    },
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    }
})

module.exports = mongoose.model('CinemaHall', cinemaHallSchema)