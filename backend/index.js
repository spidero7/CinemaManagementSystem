const path = require('path')
const express = require('express')
const app = express()
const { port } = require('./config')
const cors = require('cors')

//routes
const apiRouter = require('./routes/api')
const authUser = require('./routes/auth')
const accountRoute = require('./routes/myAccount')

//database
require('./db/mongoose')

//middlewares
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3001' }))

//route middlewares
app.use('/', apiRouter)
app.use('/', authUser)
app.use('/', accountRoute)

//server
app.listen(port, () => {
	console.log(`Server listening on ${port}`)
})
