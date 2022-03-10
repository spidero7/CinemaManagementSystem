const router = require('express').Router()
const Movie = require('../model/Movie');
const cors = require("cors");

const currentYear = new Date().getFullYear()  // returns the current year

router.get('/upcoming', cors(), async (req, res) => {
    const filter = { year: { $gte: currentYear } };
    const allUpcoming = await Movie.find(filter);

    res.send(allUpcoming);

})

module.exports = router
