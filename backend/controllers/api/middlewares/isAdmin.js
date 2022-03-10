const User = require('../../../model/User')

module.exports = function (req, res, next) {
    User.findById(req.user._id, (err, user) => {
        if(err) {
            return res.status(500).send("Server error.")  
        }

        if(user.name != "administrator") {
            return res.status(401).send("Unauthorized.")
        } else {
            next()
        }

    })

    
}
