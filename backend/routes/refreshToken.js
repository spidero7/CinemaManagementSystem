const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
	const cookies = req.cookies
	console.log(cookies)
	if (!cookies?.jwt) return res.sendStatus(401)

	const refreshToken = cookies.jwt

	const foundUser = await User.findOne({ refreshToken }).exec()
	if (!foundUser) return res.status(403).send('No user in DB') //Forbidden
	// evaluate jwt
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
		if (err) return res.sendStatus(403)

		const roles = Object.values(foundUser.roles)
		const accessToken = jwt.sign(
			{
				user_details: {
					email: foundUser.email,
					roles: roles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '30s' }
		)

		res.json({ accessToken })
	})
})

module.exports = router
