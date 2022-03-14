const router = require('express').Router()
const User = require('../model/User')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')

router.get('/', verifyRoles(ROLES_LIST.Admin), (req, res) => {
	res.json(req.user)
	User.findOne({ user: req.user })
})

module.exports = router
