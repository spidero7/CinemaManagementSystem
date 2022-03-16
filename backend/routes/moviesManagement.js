const router = require('express').Router();
const Movie = require('../model/Movie');
const verifyToken = require('../middleware/verifyToken');
const mongoose = require('mongoose');
const cors = require("cors");
const corsOptions = require('../config/corsOptions');

router.use(cors(corsOptions));

//Display all movies
router.get('/', cors(corsOptions), verifyToken, (req, res) => {
    Movie.find({}, (err, docs) => {
        if (err) {
            return res.status(500).send("server error - /movies GET")
        }
        return res.status(200).send(docs)
    });
});

//Adding new movie
router.post('/new', cors(corsOptions), verifyToken, async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        genres: req.body.genres,
        description: req.body.description,
        poster: req.body.poster,
        length: req.body.length,
        stars: req.body.stars
    });

    try {
        const savedMovie = await movie.save()
        return res.status(201).json({ savedMovie })
    } catch (e) {
        console.error("server error - /movies POST", e)
        return res.status(500).send("Error saving the movie.")
    }
});


router.delete("/:id", cors(corsOptions), verifyToken, async (req, res) => {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(400).send("Invalid params");
        return;
    }

    Movie.findOneAndDelete({ _id: _id }, function (err) {
        if (err) {
            return res.status(500).send("server error while deleting movie - /movies DELETE", err);
        }
        else {
            return res.status(200).send("Successfully deleted");
        }
    });

});

module.exports = router
