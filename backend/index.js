const path = require('path')
const express = require('express')
const app = express()
const { port } = require('./config')

//routes
const apiRouter = require('./routes/api')
const authUser = require('./routes/auth')
const postRoute = require('./routes/myAccount')
const cinemaRoute = require('./routes/cinema')

//database
require('./db/mongoose')

//middlewares
app.use(express.json())

//route middlewares
app.use('/', apiRouter)
app.use('/', authUser)
app.use('/', postRoute)
app.use('/', cinemaRoute)

//server
app.listen(port, () => {
	console.log(`Server listening on ${port}`)
})
