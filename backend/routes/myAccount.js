const router = require('express').Router()
const User = require('../model/User')
const verifyToken = require('../middleware/verifyToken')
const verifyUser = require('../middleware/verifyUser')

router.get('/', verifyToken, verifyUser, (req, res) => {
	res.json(req.user)
	User.findOne({ user: req.user })
})

module.exports = router
