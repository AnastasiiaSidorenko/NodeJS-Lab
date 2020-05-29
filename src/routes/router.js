const { Router } = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const pokemons = require('./pokemons');
const catchPokemon = require('./catchPokemon');
const caughtPokemons = require('./caughtPokemons');
const auth = require('./auth');
const privateKey = require('../privateKey');
const bcrypt = require('bcryptjs');

const router = Router();

function verifyJWT(token) {
  let isValid = false;
  if (token) {
    jwt.verify(token, privateKey, (err) => {
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
  ((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password).then((res) => {
        if (res) {
          return done(null, { username, password });
        }
        return done(null, false, { message: 'Incorrect password' });
      });
    });
  }),
));

passport.use(new BearerStrategy(
  ((token, done) => {
    const isValid = verifyJWT(token);
    if (!isValid) {
      return done(null, false);
    }
    return done(null, token);
  }),
));

router.use('/auth', passport.authenticate('local', { session: false }), auth);
router.use('/pokemons', passport.authenticate('bearer', { session: false }), pokemons);
router.use('/caughtPokemons', passport.authenticate('bearer', { session: false }), caughtPokemons);
router.use('/catchPokemon', passport.authenticate('bearer', { session: false }), catchPokemon);

module.exports = router;
