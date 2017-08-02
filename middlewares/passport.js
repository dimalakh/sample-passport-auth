const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;

const User = require('../models/user');

const facebookCreds = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
};

passport.use(
    new FacebookStrategy(
        facebookCreds,
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate(
                { facebookId: profile.id },
                function (err, result) {
                    if (result) {
                        result.access_token = accessToken; //eslint-disable-line
                        result.save((err, doc) => {
                            done(err, doc);
                        });

                        return;
                    }

                    done(err, result);
                }
            );
        }
    )
);

const instagramCreds = {
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/instagram/callback'
};

passport.use(
    new InstagramStrategy(
        instagramCreds,
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate(
                { instagramId: profile.id },
                function (err, result) {
                    if (result) {
                        result.access_token = accessToken; // eslint-disable-line
                        result.save((err, doc) => {
                            done(err, doc);
                        });

                        return;
                    }

                    done(err, result);
                }
            );
        }
    )
);

passport.use(
    new BearerStrategy(
        function (token, done) {
            User.findOne({ access_token: token }) //eslint-disable-line
                .select(['-password', '-access_token'])
                .exec((err, user) => {
                    if (err) return done(err);

                    if (!user) return done(null, false);

                    return done(null, user, { scope: 'all' });
                });
        }
    )
);

module.exports = passport;
