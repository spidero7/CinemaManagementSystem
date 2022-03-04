const router = require('express').Router()
const User = require('../model/User')
const verify = require('./verifyToken')
const verifyUser = require('./verifyUser')

router.get('/my-account', verify, verifyUser, (req, res) => {
	res.json(req.user)
	User.findOne({ user: req.user })
})

module.exports = router
