const path = require('path')
const express = require('express')
const app = express()
const { port } = require('./config')

//routes
const apiRouter = require('./routes/api')
const authUser = require('./routes/auth')
<<<<<<< HEAD
const accountRoute = require('./routes/myAccount')
=======
const postRoute = require('./routes/myAccount')
const cinemaRoute = require('./routes/cinema')
>>>>>>> 48f25a538ecf8b4303553bf1e384ffb2dcda8e1e

//database
require('./db/mongoose')

//middlewares
app.use(express.json())

//route middlewares
app.use('/', apiRouter)
app.use('/', authUser)
<<<<<<< HEAD
app.use('/', accountRoute)
=======
app.use('/', postRoute)
app.use('/', cinemaRoute)
>>>>>>> 48f25a538ecf8b4303553bf1e384ffb2dcda8e1e

//server
app.listen(port, () => {
	console.log(`Server listening on ${port}`)
})
