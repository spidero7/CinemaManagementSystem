const router = require('express').Router();
const Movie = require('../model/Movie');
const cors = require("cors");
const corsOptions = require('../config/corsOptions');
const mongoose = require('mongoose');

router.get('/:id', cors(corsOptions), (req, res) => {
    const _id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(400).send("Invalid params");
        return;
    }

    Movie.findOne({ _id: _id }, (err, docs) => {
        if (err) {
            return res.status(500).send("server error - /movie GET")
        }
        return res.status(200).send(docs)
    });
});

module.exports = router