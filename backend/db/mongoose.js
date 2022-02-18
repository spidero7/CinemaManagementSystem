const mongoose = require('mongoose')
require('dotenv').config()

const username = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const database = process.env.DATABASE_NAME
const url = process.env.MONGO_URL

console.log(username)

const uri = `mongodb+srv://${username}:${password}@${url}/${database}?retryWrites=true&w=majority`
console.log(username)
try {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
      () => {
        console.log('DB connected')
      },
      (err) => {
        console.error('DB connection error', err)
      }
    )
} catch (error) {
  console.log('Could not connect db')
}

var db = mongoose.connection
