const router = require('express').Router()
const User = require('../model/User')

//LOGOUT
router.get('/', async (req, res) => {
	const cookies = req.cookies
	console.log(req.cookies)
	if (!cookies?.jwt) return res.status(204).send('No content')

	const refreshToken = cookies.jwt

	//is refresh token in db?
	const foundUser = await User.findOne({ refreshToken }).exec()
	if (!foundUser) {
		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
		})
		return res.sendStatus(204)
	}

	//delete refresh token in db
	foundUser.refreshToken = ''
	const result = await foundUser.save()
	console.log(result)

	res.clearCookie('jwt', {
		httpOnly: true,
		sameSite: 'None',
		secure: true,
	})
	res.sendStatus(204)
})

module.exports = router
