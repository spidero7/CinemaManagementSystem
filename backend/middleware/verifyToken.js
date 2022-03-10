const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization
	if (!authHeader) return res.status(401).send('No auth')
	console.log(authHeader) // Bearer token
	const token = authHeader.split(' ')[1]
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.status(403).send('Invalid token')
		req.user = decoded.user_details.email
		req.roles = decoded.user_details.roles
		next()
	})
}

module.exports = verifyJWT
