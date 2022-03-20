const route = require('express').Router()
const CinemaHall = require('../model/CinemaHall')
const verifyToken = require('../middleware/verifyToken')
const mongoose = require('mongoose')

const cors = require('cors')
const corsOptions = require('../config/corsOptions')

route.use(cors(corsOptions))

route.post('/cinema-hall', verifyToken, async (req, res) => {
    const cinemaHall = new CinemaHall({
        rows: req.body.rows,
        cols: req.body.cols,
        name: req.body.name,
        cinemaId: req.body.cinemaId
    })

    try {
        const savedCinemaHall = await cinemaHall.save()
        return res.status(201).json({savedCinemaHall})
    } catch (e) {
        console.error('server error - /cinema-hall POST')
        return res.status(500).send/('Error while saving cinema hall.')
    }
})

route.get('/cinema-halls/:cinemaId', async (req, res) => {
    const _cinemaId = req.params.cinemaId

    if(!mongoose.Types.ObjectId.isValid(_cinemaId)) {
        return res.status(400).send("Invalid cinema id")
    }
    CinemaHall.find({
        cinemaId: _cinemaId
    }, (err, docs) => {
        if(err) {
            return res.status(500).send("server error - /cinema-hall GET")
        }
        return res.status(200).send(docs)
    })
})

route.get('/cinema-hall/:cinemaHallId', async (req, res) => {
    const _cinemaHallId = req.params.cinemaHallId

    if(!mongoose.Types.ObjectId.isValid(_cinemaHallId)) {
        return res.status(400).send("Invalid cinema id")
    }
    CinemaHall.findById({
        _id: _cinemaHallId
    }, (err, docs) => {
        if(err) {
            return res.status(500).send("server error - /cinema-hall GET")
        }
        return res.status(200).send(docs)
    })
})

route.put('/cinema-hall', verifyToken, async (req, res) => {
    CinemaHall.findByIdAndUpdate(
        req.body.id,
        {...req.body.newCinemaHall},
        { new: true },
        (err, docs) => {
            if(err) {
                return res.status(500)
                    .send('server error - /cinemas PUT')
            }
            return res.status(200).send(docs)
        }
    )
})

route.delete('/cinema-hall/:cinemaHallId', verifyToken, async (req, res) => {
    CinemaHall.findByIdAndDelete(
        mongoose.Types.ObjectId(req.params.cinemaHallId),
        (err, docs) => {
            if (err) {
                console.error(err)
                return res
                    .status(500)
                    .send('server error - /cinema-hall DELETE')
            }
            return res.status(200).send(docs)
        }
    )
})

module.exports = route
