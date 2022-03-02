const mongoose = require('mongoose')

const cinemaSechema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    city: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    adress: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    openingHours: {
        monday: {
            start: { type: Date },
            end: { type: Date }
        },
        tuesday: {
            start: { type: Date },
            end: { type: Date }
        },
        wednesday: {
            start: { type: Date },
            end: { type: Date }
        },
        thursday: {
            start: { type: Date },
            end: { type: Date }
        },
        friday: {
            start: { type: Date },
            end: { type: Date }
        },
        saturday: {
            start: { type: Date },
            end: { type: Date }
        },
        sunday: {
            start: { type: Date },
            end: { type: Date }
        },
    }
})

module.exports = mongoose.model('Cinema', cinemaSechema)