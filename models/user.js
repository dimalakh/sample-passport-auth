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
    token: {
        type: String
    }
});

UserSchema.statics.findOrCreate = function (filters, cb) {
    const User = this;

    this.find(filters, (err, results) => {
        if (results.length === 0) {
            const newUser = new User(filters);

            newUser.save((err, doc) => {
                cb(err, doc);
            });

            return;
        }

        cb(err, results[0]);
    });
};

module.exports = mongoose.model('User', UserSchema);
