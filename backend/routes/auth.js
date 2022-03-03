const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation')

//REGISTER
router.post('/register', async (req, res) => {
	//validate the data
	const { error } = registerValidation(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	//check if the user is already in the db
	const emailExist = await User.findOne({ email: req.body.email })
	if (emailExist)
		return res.status(400).send({ message: 'Email already exist' })

	//hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	//create a new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	})
	try {
		const savedUser = await user.save()
		if (savedUser) res.json({ message: 'Thanks for registering' })
		res.send({ user: user._id })
	} catch (err) {
		res.status(404).send(err)
	}
})

//LOGIN
router.post('/login', async (req, res) => {
	//validate the data
	const { error } = loginValidation(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	//check if the email exist
	const user = await User.findOne({ email: req.body.email })
	if (!user) return res.status(400).send({ message: 'Email is not found' })

	//check if password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password)
	if (!validPass) return res.status(400).send({ message: 'Invalid password' })

	//create and assign a token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
	res.json({
		message: 'Login successful',
		token,
		user_details: { user: user._id, email: user.email },
	})
})

module.exports = router
