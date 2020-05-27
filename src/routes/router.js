const { Router } = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
const pokemons = require('./pokemons');
const catchPokemon = require('./catchPokemon');
const caughtPokemons = require('./caughtPokemons');
const auth = require('./auth');
const privateKey = require('../privateKey');

const router = Router();

function verifyJWT(token) {
    let isValid = false;
    if (token) {
        jwt.verify(token, privateKey, function (err) {
            if (err) {
                isValid = false;
            } else {
                isValid = true;
            }
        });
    } else {
        isValid = false;
    }
    return isValid;
}

passport.use(new LocalStrategy(
    { session: false },
    function (username, password, done) {
        User.findOne({ username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, { username, password });
        });
    }
));

passport.use(new BearerStrategy(
    function (token, done) {
        const isValid = verifyJWT(token);
        if (!isValid) {
            return done(null, false);
        }
        return done(null, token);
    }
));

router.use('/auth', passport.authenticate('local', { session: false }), auth);
router.use('/pokemons', passport.authenticate('bearer', { session: false }), pokemons);
router.use('/caughtPokemons', passport.authenticate('bearer', { session: false }), caughtPokemons);
router.use('/catchPokemon', passport.authenticate('bearer', { session: false }), catchPokemon);

module.exports = router;