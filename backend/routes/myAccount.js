const router = require('express').Router()
const User = require('../model/User')
const verify = require('./verifyToken')

router.get('/my-account', verify, (req, res) => {
	res.json(req.user)
	User.findOne({ user: req.user })
})

module.exports = router
