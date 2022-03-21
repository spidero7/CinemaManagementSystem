const route = require('express').Router()
const Cinema = require('../model/Cinema')
const verifyToken = require('../middleware/verifyToken')
const verifyRoles = require('../middleware/verifyRoles')
const ROLES_LIST = require('../config/roles_list')
const mongoose = require('mongoose')

const cors = require("cors");
const corsOptions = require('../config/corsOptions');

route.use(cors(corsOptions));

route.post('/cinema', cors(corsOptions), verifyToken, verifyRoles(ROLES_LIST.Admin), async (req, res) => {
	const cinema = new Cinema({
		country: req.body.country,
		city: req.body.city,
		adress: req.body.adress,
		openingHours: {
			monday: {
				start: req.body.openingHours.monday.start,
				end: req.body.openingHours.monday.end,
			},
			tuesday: {
				start: req.body.openingHours.tuesday.start,
				end: req.body.openingHours.tuesday.end,
			},
			wednesday: {
				start: req.body.openingHours.wednesday.start,
				end: req.body.openingHours.wednesday.end,
			},
			thursday: {
				start: req.body.openingHours.thursday.start,
				end: req.body.openingHours.thursday.end,
			},
			friday: {
				start: req.body.openingHours.friday.start,
				end: req.body.openingHours.friday.end,
			},
			saturday: {
				start: req.body.openingHours.saturday.start,
				end: req.body.openingHours.saturday.end,
			},
			sunday: {
				start: req.body.openingHours.sunday.start,
				end: req.body.openingHours.sunday.end,
			},
		},
	})

	try {
		const savedCinema = await cinema.save()
		return res.status(201).json({ savedCinema })
	} catch (e) {
		console.error('server error - /cinema POST', e)
		return res.status(500).send('Error saving the cinema.')
	}
})

route.get('/cinemas', async (req, res) => {
	Cinema.find({}, (err, docs) => {
		if (err) {
			return res.status(500).send('server error - /cinemas GET')
		}
		return res.status(200).send(docs)
	})
})

route.put('/cinema', cors(corsOptions), verifyToken, verifyRoles(ROLES_LIST.Admin), async (req, res) => {
	Cinema.findByIdAndUpdate(
		req.body.id,
		{ ...req.body.newCinema },
		{ new: true },
		(err, docs) => {
			if (err) {
				return res
					.status(400)
					.send('server error while updating cinema - /cinema PUT')
			}
			return res.status(200).send(docs)
		}
	)
})

route.delete('/cinema/:id', cors(corsOptions), verifyToken, verifyRoles(ROLES_LIST.Admin), async (req, res) => {
	Cinema.findByIdAndDelete(
		mongoose.Types.ObjectId(req.params.id),
		(err, docs) => {
			if (err) {
				console.error(err)
				return res
					.status(400)
					.send('server error while deleting cinema - /cinema DELETE')
			}
			return res.status(200).send(docs)
		}
	)
})

module.exports = route
