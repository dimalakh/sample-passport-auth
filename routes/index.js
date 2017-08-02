const express = require('express');
const router = express.Router(); //eslint-disable-line
const passport = require('passport');
const auth = require('../middlewares/auth');

const signUp = require('./sign-up');
const logIn = require('./log-in');

router.get('/profile', auth, (req, res) => {
    res.json(req.user);
});

// Local auth routes
router.post('/auth/signup', signUp);
router.post('/auth/login', logIn);


// Facebook auth routes
router.get('/auth/facebook',
    passport.authenticate('facebook', { session: false, scope: [] })
);

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
    (req, res) => {
        res.send(req.user.access_token);
    }
);

// Instagram auth routes
router.get('/auth/instagram',
    passport.authenticate('instagram', { session: false })
);

router.get('/auth/instagram/callback',
    passport.authenticate('instagram', { session: false, failureRedirect: '/' }),
    (req, res) => {
        res.send(req.user.access_token);
    }
);

module.exports = router;
