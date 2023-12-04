const { use } = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const PassInit = (passport) => {

    passport.use(new LocalStrategy(async (username, password, done) => {

        try {

            const user = await User.findOne({ username });
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password).then((result) => {

                if (!result) {
                    console.log(user)
                    return done(null, false);
                }
            })
            return done(null, user);

        } catch (error) {
            return done(error, false);
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {

        try {
            const user = await User.findById(id);
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }

    });
}

const isAuthenticted = (req, res, next) => {
    if (req.user) return next();
    res.redirect('/login');
}

module.exports = { PassInit, isAuthenticted };