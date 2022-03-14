const User = require('../model/User')

module.exports = async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email })

	if (user.roles.Admin !== 'Admin') res.status(400).send('Access Denied')

	try {
		next()
	} catch (err) {
		res.status(400).send('Invalid role')
	}
}
