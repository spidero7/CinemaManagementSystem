const mongoose = require('mongoose')
require('dotenv').config();

const username = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const database = process.env.DATABASE_NAME

const uri = `mongodb+srv://${username}:${password}@joaoteam-project-3.stwcu.mongodb.net/${database}?retryWrites=true&w=majority`;

try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
        console.log("Db connected"));
} catch (error) {
    console.log("Could not connect db");
}

var db = mongoose.connection;
