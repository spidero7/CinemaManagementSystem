const path = require('path')
const express = require('express')
const app = express()
const { port } = require('./config')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const verifyToken = require('./middleware/verifyToken')

//routes
const apiRouter = require('./routes/api')

const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const refreshRoute = require('./routes/refreshToken')
const logutRoute = require('./routes/logout')
const userAccountRoute = require('./routes/userAccount')
const adminAccountRoute = require('./routes/adminAccount')

const screeningRoute = require('./routes/screening')
const cinemaRoute = require('./routes/cinema')
const upcomingMovies = require('./routes/upcomingMovies')
const moviesManagement = require('./routes/moviesManagement')
const movieInfo = require('./routes/movieInfo')
const cinemaHallRoute = require('./routes/cinemaHall')


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
app.use('/', upcomingMovies)
app.use('/movie', movieInfo)

app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/refresh', refreshRoute)
app.use('/logout', logutRoute)
app.use('/', cinemaHallRoute)
app.use('/', screeningRoute)

app.use(verifyToken)
app.use('/user-account', userAccountRoute)
app.use('/admin-account', adminAccountRoute)

app.use('/', cinemaRoute)
app.use('/movies', moviesManagement)

//server
app.listen(port, () => {
	console.log(`Server listening on ${port}`)
})
