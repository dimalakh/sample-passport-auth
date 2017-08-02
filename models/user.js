const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    facebookId: {
        type: String
    },
    instagramId: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    access_token: { //eslint-disable-line
        type: String
    },
});

UserSchema.statics.findOrCreate = function (filters, cb) {
    this.find(filters, function (err, results) {
        if (results.length === 0) {
            const newUser = new User();

            newUser.facebookId = filters.facebookId;

            newUser.save((err, doc) => {
                cb(err, doc);
            });

            return;
        }

        cb(err, results[0]);
    });
};

module.exports = mongoose.model('User', UserSchema);
