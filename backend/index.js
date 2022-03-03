const path = require('path')
const express = require('express')
const app = express()
const { port } = require('./config')

//routes
const apiRouter = require('./routes/api')
const authUser = require('./routes/auth')
const accountRoute = require('./routes/myAccount')
const postRoute = require('./routes/myAccount')
const cinemaRoute = require('./routes/cinema')
const upcomingMovies = require('./routes/upcomingMovies')


//database
require('./db/mongoose')

//middlewares
app.use(express.json())

//route middlewares
app.use('/', apiRouter)
app.use('/', authUser)
app.use('/', accountRoute)
app.use('/', postRoute)
app.use('/', cinemaRoute)
app.use('/', upcomingMovies)


//server
app.listen(port, () => {
	console.log(`Server listening on ${port}`)
})
