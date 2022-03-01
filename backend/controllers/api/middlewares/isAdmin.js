const User = require('../../../model/User')

module.exports = function (req, res, next) {
    User.findById(req.user._id, (err, user) => {
        if(err) {
            console.error(err)
            res.status(500).send("Server error.")
            return
        }

        if(user.name != "administrator") {
            res.status(403).send("Access denied.")
            return
        }
    })

    next()
}
