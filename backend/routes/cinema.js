const route = require('express').Router()
const Cinema = require('../model/Cinema')
const verifyToken = require('../routes/verifyToken')
const isAdmin = require('../controllers/api/middlewares/isAdmin')

// ADD CINEMA
route.post("/cinema", verifyToken, isAdmin, async (req, res) => {
    const cinema = new Cinema({
        country: req.body.country,
        city: req.body.city,
        adress: req.body.adress,
        openingHours: {
            monday: {
                start: req.body.openingHours.monday.start,
                end: req.body.openingHours.monday.end
            },
            tuesday: {
                start: req.body.openingHours.tuesday.start,
                end: req.body.openingHours.tuesday.end
            },
            wednesday: {
                start: req.body.openingHours.wednesday.start,
                end: req.body.openingHours.wednesday.end
            },
            thursday: {
                start: req.body.openingHours.thursday.start,
                end: req.body.openingHours.thursday.end
            },
            friday: {
                start: req.body.openingHours.friday.start,
                end: req.body.openingHours.friday.end
            },
            saturday: {
                start: req.body.openingHours.saturday.start,
                end: req.body.openingHours.saturday.end
            },
            sunday: {
                start: req.body.openingHours.sunday.start,
                end: req.body.openingHours.sunday.end
            },
        }
    })

    try {
        const savedCinema = await cinema.save()
        res.status(201).json({ savedCinema })
    } catch (e) {
        console.error("error in cinema post", e)
    }
})

module.exports = route