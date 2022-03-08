const path = require('path')
const express = require('express')
const app = express()
const { port } = require('./config')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')

//routes
const apiRouter = require('./routes/api')
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const refreshRoute = require('./routes/refreshToken')
const logutRoute = require('./routes/logout')
const myAccountRoute = require('./routes/myAccount')

//database
require('./db/mongoose')

//middlewares
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//route middlewares
app.use('/', apiRouter)
app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/refresh', refreshRoute)
app.use('/logout', logutRoute)
app.use('/my-account', myAccountRoute)

//server
app.listen(port, () => {
	console.log(`Server listening on ${port}`)
})
