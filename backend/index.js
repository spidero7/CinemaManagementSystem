const path = require('path')
const express = require('express')
const app = express()
const { port } = require('./config')

//database
require('./db/mongoose')

//routes
const apiRouter = require('./routes/api')

app.use('/', apiRouter)

//database
require('./db/mongoose')

//server
app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
