const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = function (req, res) {
    const salt = 10;

    const newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt)
    });

    newUser.save((err, user) => {
        if (err) res.json(err);

        res.json({
            id: user._id,
            email: user.email
        });
    });
};
