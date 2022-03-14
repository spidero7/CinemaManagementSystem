const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { loginValidation } = require('../validation')

//LOGIN
router.post('/', async (req, res) => {
	//validate the data
	const { error } = loginValidation(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	//check if the email exist
	const user = await User.findOne({ email: req.body.email })
	if (!user) return res.status(400).send({ message: 'Email is not found' })

	//check if password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password)
	if (!validPass) return res.status(400).send({ message: 'Invalid password' })

	//find user roles
	const roles = Object.values(user.roles).filter(Boolean)

	//create and assign a access token
	const accessToken = jwt.sign(
		{
			user_details: {
				email: user.email,
				roles: roles,
			},
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '30s' }
	)

	//create and assign a refresh token
	const refreshToken = jwt.sign(
		{ email: user.email },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '1h' }
	)

	user.refreshToken = refreshToken
	const result = await user.save()
	console.log(result)
	console.log(roles)

	res.cookie('jwt', refreshToken, {
		httpOnly: true,
		sameSite: 'None',
		maxAge: 24 * 60 * 60 * 1000,
		secure: true,
	})

	console.log(req.cookies)

	res.json({ roles, accessToken })
})

module.exports = router
