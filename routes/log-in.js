const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = function (req, res) {
    User.findOne({
        email: req.body.email
    })
        .select('-token')
        .exec((err, user) => {
            if (err) return res.send(err);

            if (user === null) return res.sendStatus(404);

            if (bcrypt.compareSync(req.body.password, user.password)) {
                const accessToken = jwt.sign(
                    user,
                    process.env.JWT_SECRET_KEY
                );

                user.token = accessToken;
                user.save();

                return res.json(accessToken);
            }

            return res.sendStatus(401);
        });
};
