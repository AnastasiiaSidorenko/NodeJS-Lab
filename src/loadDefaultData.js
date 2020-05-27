const fs = require('fs');
const Pokemon = require('./schemas/pokemon');
const User = require('./schemas/user');

const defaultPokemons = JSON.parse(fs.readFileSync('../pokemons.json'));
const defaultUsers = JSON.parse(fs.readFileSync('../users.json'));

module.exports = {
  loadDefaultPokemons() {
    Pokemon.insertMany(defaultPokemons, (err) => {
      if (err) {
        console.log('Pokemons request failed');
      }
      console.log('Pokemons are saved!');
    });
  },
  loadDefaultUsers() {
    User.insertMany(defaultUsers, (err) => {
      if (err) {
        console.log('Users request failed');
      }
      console.log('Users are saved!');
    });
  },
};
