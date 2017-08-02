const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = function (req, res) {
    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (err) return res.send(err);

            if (user === null) return res.sendStatus(404);

            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign(
                    user,
                    'secretKey'
                );

                user.access_token = token; //eslint-disable-line
                user.save();

                return res.json(token);
            }

            return res.sendStatus(401);
        });
};
